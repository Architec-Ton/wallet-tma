import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Cell } from "@ton/core";
import classNames from "classnames";
import { useCreateOrderMutation } from "features/market/marketApi";
import { marketSelector } from "features/market/marketSelectors";
import { MarketModeEnum } from "features/market/marketSlice";
import { CoinDto } from "types/assest";

import { useAppSelector } from "hooks/useAppDispatch";
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import { useTmaMainButton } from "hooks/useTma";
import { useTon } from "hooks/useTon";

import Page from "components/containers/Page";
import Row from "components/containers/Row";
import Section from "components/containers/Section";
import Block from "components/typography/Block";
import AssetIcon from "components/ui/assets/AssetIcon";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";

const ConfirmOrder = () => {
  const t = useLanguage("market-order-confirm");
  const ton = useTon();
  const btn = useTmaMainButton();
  const page = usePage();
  const navigate = useNavigate();
  const { fromAsset, toAsset, mode: orderMode, fromValue, toValue } = useAppSelector(marketSelector);
  const [createOrderApi] = useCreateOrderMutation();

  useEffect(() => {
    page.setLoading(false);
  }, []);

  useEffect(() => {
    btn.init(
      "Confirm",
      async () => {
        const data = {
          type: orderMode,
          fromAsset: { type: fromAsset?.type as string, address: fromAsset?.meta?.address as string },
          toAsset: { type: toAsset?.type as string, address: toAsset?.meta?.address as string },
          fromValue: Number(fromValue) * Math.pow(10, fromAsset?.meta?.decimals || 0),
          toValue: Number(toValue),
        };
        console.log("data", data);
        const order = await createOrderApi(data);

        // TODO: send transaction

        console.log("order:", order);

        if (order.data && order.data.rawTxn) {
          const { rawTxn } = order.data;
          const body = Cell.fromBase64(rawTxn.body);

          console.log("body hash", body.hash());

          const resp = await ton.sender.send({
            value: rawTxn.value,
            to: rawTxn.to,
            body: body,
            sendMode: rawTxn.mode,
          });
          console.log("resp", resp);
        }

        navigate("/market", { replace: true });
      },
      true,
    );
  }, [fromValue, toValue]);

  const textContents =
    orderMode === MarketModeEnum.BUY
      ? { primaryTitle: t("you-buy"), secondaryTitle: t("you-give") }
      : { primaryTitle: t("you-sell"), secondaryTitle: t("you-receive") };

  return (
    <Page>
      <Section title={textContents.primaryTitle}>
        <Block>
          <Row className="w-full">
            {fromAsset && <AssetIcon asset={fromAsset as CoinDto} className="market-asset-icon" />}
            <div className="grow">{fromAsset?.meta?.symbol}</div>
            <div>{fromValue}</div>
          </Row>
        </Block>
      </Section>
      <Section title={textContents.secondaryTitle}>
        <Block>
          <Row className="w-full">
            <AssetIcon asset={toAsset as CoinDto} className="market-asset-icon" />
            <div className="grow">{toAsset?.meta?.symbol}</div>
            <div>{toValue}</div>
          </Row>
        </Block>
      </Section>
      <Section title={t("info")}>
        <ListBlock>
          <ListBaseItem className="w-full">
            <div className="grow">{t("commission", "transaction")}</div>
            <div>0.02 TON</div>
          </ListBaseItem>
          <ListBaseItem className="w-full">
            <div className="grow">{t("gas", "transaction")}</div>
            <div>~ 0.3 TON</div>
          </ListBaseItem>
        </ListBlock>
      </Section>
    </Page>
  );
};

export default ConfirmOrder;
