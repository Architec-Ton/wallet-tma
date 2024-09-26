import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { Cell } from "@ton/core";
import classNames from "classnames";
import { showAlert } from "features/alert/alertSlice";
import { selectAuthIsReady } from "features/auth/authSelector";
import { useCreateOrderMutation } from "features/market/marketApi";
import { marketSelector } from "features/market/marketSelectors";
import { MarketModeEnum } from "features/market/marketSlice";
import { CoinDto } from "types/assest";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import { useTmaMainButton } from "hooks/useTma";
import { useTon } from "hooks/useTon";
import { useTonClient } from "hooks/useTonClient";

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
  const dispatch = useAppDispatch();
  const { client } = useTonClient();
  const { fromAsset, toAsset, mode: orderMode, fromValue, toValue } = useAppSelector(marketSelector);
  const isReady = useAppSelector(selectAuthIsReady);
  const [createOrderApi] = useCreateOrderMutation();
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    page.setLoading(false);
  }, []);

  useEffect(() => {
    if (isReady) {
      btn.init("Confirm", confirmHandler, true);
    }
  }, [isReady, client]);

  const confirmHandler = async (): Promise<any> => {
    const _fromAsset = orderMode === MarketModeEnum.BUY ? toAsset : fromAsset;
    const _toAsset = orderMode === MarketModeEnum.BUY ? fromAsset : toAsset;
    const _fromValue = orderMode === MarketModeEnum.BUY ? toValue : fromValue;
    const _toValue = orderMode === MarketModeEnum.BUY ? fromValue : toValue;
    const data = {
      type: orderMode,
      fromAsset: { type: _fromAsset?.type as string, address: _fromAsset?.meta?.address as string },
      toAsset: { type: _toAsset?.type as string, address: _toAsset?.meta?.address as string },
      fromValue: Number(_fromValue),
      toValue: Number(_toValue),
    };

    try {
      const order = await createOrderApi(data);
      if (order.error) {
        const error = order.error as FetchBaseQueryError;
        if (Number(error.status) < 500) {
          throw new Error("Order creating is failed");
        }
        if (retryCount < 3) {
          setRetryCount((r) => r + 1);
          return await confirmHandler();
        }
        throw new Error("Transaction failed");
      }
      if (order.data && order.data.rawTxn) {
        const { rawTxn } = order.data;
        const body = Cell.fromBase64(rawTxn.body);

        await ton.sender.send({
          value: BigInt(rawTxn.value).valueOf(),
          to: rawTxn.to,
          body: body,
          sendMode: rawTxn.mode,
        });
      }

      navigate("/market", { replace: true });
    } catch (e) {
      dispatch(showAlert({ message: "Transaction failed", duration: 3000 }));
    }
  };

  const textContents =
    orderMode === MarketModeEnum.BUY
      ? { primaryTitle: t("you-buy"), secondaryTitle: t("you-give") }
      : { primaryTitle: t("you-sell"), secondaryTitle: t("you-receive") };

  return (
    <Page>
      <Section title={textContents.primaryTitle} className="market-order-asset">
        <Block>
          <Row className="w-full">
            {fromAsset && <AssetIcon asset={fromAsset as CoinDto} className="market-asset-icon" />}
            <div className="grow">{fromAsset?.meta?.name}</div>
            <div>{fromValue}</div>
          </Row>
        </Block>
      </Section>
      <Section title={textContents.secondaryTitle} className="market-order-asset">
        <Block>
          <Row className="w-full">
            <AssetIcon asset={toAsset as CoinDto} className="market-asset-icon" />
            <div className="grow">{toAsset?.meta?.name}</div>
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
