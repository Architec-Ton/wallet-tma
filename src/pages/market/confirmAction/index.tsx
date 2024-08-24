import React, { useEffect, useState } from "react";
import Page from "components/containers/Page";
import Row from "components/containers/Row";
import Section from "components/containers/Section";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import useLanguage from "hooks/useLanguage";
import { marketSelector } from "features/market/marketSelectors";
import { MarketModeEnum } from "features/market/marketSlice";
import { useAppSelector } from "hooks/useAppDispatch";
import { useNavigate, useParams } from "react-router-dom";
import { MarketOrderDto } from "types/market";
import { useTmaMainButton } from "hooks/useTma";
import { order } from "../mock";

const ConfirmAction = () => {
  const t = useLanguage("market-order")
  const btn = useTmaMainButton()
  const navigate = useNavigate()
  const { id } = useParams()
  const { mode } = useAppSelector(marketSelector)

  const [selectedOrder, setSelectedOrder] = useState<MarketOrderDto | undefined>()
  const [textData, setTextData] = useState<{youSell: string, sellerInfo: string, youReceive: string} | undefined>()

  useEffect(() => {
    btn.init(t("confirm", "button"), sendTransaction, true)
  }, [])

  useEffect(() => {
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

  const sendTransaction = () => {
    console.log("sendTransaction confirm")
    // TODO: send confirm transaction
    navigate("/market", {replace: true})
  }  

  return (
    <Page>
      <Section title={textData?.youSell}>
        <Row>
          <img src="" alt="" className="market-asset-icon" />
          <div className="grow">{selectedOrder?.assets.primaryAsset?.meta?.symbol}</div>
          <div>{selectedOrder?.assets.primaryAsset.amount}</div>
        </Row>
      </Section>
      <Section title={textData?.sellerInfo}>
        <ListBlock>
          <ListBaseItem className="w-full">
            <div>{t("username")}</div>
            <div>{selectedOrder?.userName}</div>
          </ListBaseItem>
          <ListBaseItem className="w-full">
            <div>{t("total-trades")}</div>
            <div>{selectedOrder?.stats}</div>
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
          <img src="" alt="" className="market-asset-icon" />
          <div className="grow">{selectedOrder?.assets.secondaryAsset?.meta?.symbol}</div>
          <div>{selectedOrder?.assets.secondaryAsset.amount}</div>
        </Row>
      </Section>
    </Page>
  )
}

export default ConfirmAction