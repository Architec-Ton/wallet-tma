import React, { useEffect, useState } from "react";
import Page from "components/containers/Page";
import Row from "components/containers/Row";
import Section from "components/containers/Section";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import useLanguage from "hooks/useLanguage";
import { marketOrdersSelector, marketSelector } from "features/market/marketSelectors";
import { MarketModeEnum } from "features/market/marketSlice";
import { useAppSelector } from "hooks/useAppDispatch";
import { useNavigate, useParams } from "react-router-dom";
import { MarketOrderDto } from "types/market";
import { useTmaMainButton } from "hooks/useTma";
import { CoinDto } from "types/assest";
import AssetIcon from "components/ui/assets/AssetIcon";
import { useLazyExecuteOrderQuery } from "features/market/marketApi";
import { useTon } from "hooks/useTon";
import { Cell } from "@ton/core";

const ConfirmAction = () => {
  const t = useLanguage("market-order")
  const btn = useTmaMainButton()
  const navigate = useNavigate()
  const ton = useTon()
  const { id } = useParams()
  const { mode } = useAppSelector(marketSelector)
  const orders = useAppSelector(marketOrdersSelector)
  const [executeOrder] = useLazyExecuteOrderQuery()

  const [selectedOrder, setSelectedOrder] = useState<MarketOrderDto | undefined>()
  const [textData, setTextData] = useState<{youSell: string, sellerInfo: string, youReceive: string} | undefined>()

  useEffect(() => {
    if (selectedOrder) {
      btn.init(t("confirm", "button"), sendTransaction, true)
    }
  }, [selectedOrder])

  useEffect(() => {
    const order = orders?.find(o => o.uuid === id)
    setSelectedOrder(order)
  }, [id, mode])

  useEffect(() => {
    if (selectedOrder) {
      const textData = selectedOrder.type === MarketModeEnum.BUY
      ? {youSell: t("confirm-you-buy"), youReceive: t("confirm-you-pay"), sellerInfo: t("confirm-seller-info")}
      : {youSell: t("confirm-you-sell"), youReceive: t("confirm-you-receive"), sellerInfo: t("confirm-buyer-info")}
      setTextData(textData)
    }
  }, [selectedOrder])

  const sendTransaction = async () => {
    console.log("sendTransaction confirm")
    
    try {
      const response = await executeOrder({uuid: selectedOrder?.uuid as string})
      if (response.data) {
        const txParams = response.data
        const body = Cell.fromBase64(txParams.body)
        await ton.sender.send({
          to: txParams.to,
          value: txParams.value,
          body
        })
        navigate("/market", {replace: true})
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Page>
      <Section title={textData?.youSell}>
        <Row>
          <AssetIcon asset={selectedOrder?.fromAsset as CoinDto} className="market-asset-icon" />
          <div className="grow">{selectedOrder?.fromAsset?.meta?.symbol}</div>
          <div>{selectedOrder?.fromValue}</div>
        </Row>
      </Section>
      <Section title={textData?.sellerInfo}>
        <ListBlock>
          <ListBaseItem className="w-full">
            <div>{t("username")}</div>
            <div>{selectedOrder?.userUsername}</div>
          </ListBaseItem>
          <ListBaseItem className="w-full">
            <div>{t("total-trades")}</div>
            <div>{selectedOrder?.userTotalOrders}</div>
          </ListBaseItem>
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
      <Section title={textData?.youReceive}>
        <Row>
          <AssetIcon asset={selectedOrder?.toAsset as CoinDto} className="market-asset-icon" />
          <div className="grow">{selectedOrder?.toAsset?.meta?.symbol}</div>
          <div>{selectedOrder?.toValue}</div>
        </Row>
      </Section>
    </Page>
  )
}

export default ConfirmAction