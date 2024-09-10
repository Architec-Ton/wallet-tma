import { Cell } from "@ton/core";
import classNames from "classnames";
import Page from "components/containers/Page";
import Row from "components/containers/Row";
import Section from "components/containers/Section";
import Block from "components/typography/Block";
import AssetIcon from "components/ui/assets/AssetIcon";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import { useCreateOrderMutation } from "features/market/marketApi";
import { marketSelector } from "features/market/marketSelectors";
import { MarketModeEnum } from "features/market/marketSlice";
import { useAppSelector } from "hooks/useAppDispatch";
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import { useTmaMainButton } from "hooks/useTma";
import { useTon } from "hooks/useTon";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CoinDto } from "types/assest";

const ConfirmOrder = () => {
  const t = useLanguage("market-order-confirm")
  const ton = useTon()
  const btn = useTmaMainButton()
  const page = usePage()
  const navigate = useNavigate()
  const { fromAsset, toAsset, mode: orderMode, fromValue, toValue } = useAppSelector(marketSelector)
  const [createOrderApi] = useCreateOrderMutation()

  useEffect(() => {
    page.setLoading(false)
  }, [])

  useEffect(() => {
    btn.init("Confirm", async () => {
      const order = await createOrderApi({
        type: orderMode,
        fromAsset: fromAsset as CoinDto,
        toAsset: toAsset as CoinDto,
        fromValue: Number(fromValue),
        toValue: Number(toValue),
      })

      // TODO: send transaction

      if (order.data && order.data.rawTxn) { 
        const { rawTxn } = order.data
        const body = Cell.fromBase64(rawTxn.body)

        await ton.sender.send({
          value: rawTxn.value,
          to: rawTxn.to,
          body: body,
        });
      }

      navigate("/market", {replace: true})
    }, true)
  }, [fromValue, toValue])

  const textContents = orderMode === MarketModeEnum.BUY 
  ? { primaryTitle: t("you-buy"), secondaryTitle: t("you-give")}
  : { primaryTitle: t("you-sell"), secondaryTitle: t("you-receive")}

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
  )
}

export default ConfirmOrder