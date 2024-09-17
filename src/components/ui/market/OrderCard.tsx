import React, { useMemo } from "react";
import ListBlock from "../listBlock";
import ListBaseItem from "../listBlock/ListBaseItem";
import Column from "components/containers/Column";
import Row from "components/containers/Row";
import { MarketOrderDto, OrderStatus } from "types/market";
import { formatDate } from "date-fns";

import "./OrderCard.styles.css"
import OrderCardIcon from "./OrderCardIcon";
import useLanguage from "hooks/useLanguage";

type OwnPropsType = {
  order: MarketOrderDto
  isActive?: boolean
  onCancel: (uuid: string) => void
}

const MarketOrderCard = ({ order, isActive = false, onCancel }: OwnPropsType) => {
  const t = useLanguage("market-order")

  const orderData = useMemo(() => {
    if (order) {
      const { createdAt } = order
      return {
        ...order,
        date: formatDate(new Date(createdAt).toString(), "dd MMMM yyyy"),
        time: formatDate(new Date(createdAt).toString(), "HH:mm:ss"),
        isActive: order?.status === OrderStatus.ACTIVE,
      }
    }
  }, [order])

  return (
    <ListBlock className="market-order-card">
      <ListBaseItem>
        {orderData && (
          <>
            <OrderCardIcon order={orderData} />
            <Column className="grow">
              <div>{orderData.fromValue} {orderData.fromAsset.meta?.symbol}</div>
              <div className="secondary-content text-sm">{orderData.toValue} {orderData.toAsset.meta?.symbol}</div>
            </Column>
            {isActive && <button className="small-button rounded-button primary-button" onClick={() => onCancel(orderData.uuid)}>Cancel</button>}
          </>
        )}
      </ListBaseItem>
      <ListBaseItem>
        <Column className="w-full">
          <Row className="order-data-row">
            <div>{t("labels-type")}</div>
            <div>{t(`type-${orderData?.type}`)}</div>
          </Row>
          <Row className="order-data-row">
            <div>{t("labels-date")}</div>
            <div>{orderData?.date}</div>
          </Row>
          {orderData && orderData.isActive && (
            <Row className="order-data-row">
              <div>{t("labels-status")}</div>
              <div className="order-status">{orderData?.status}</div>
            </Row>
          )}
          {orderData && !orderData.isActive && (
            <Row className="order-data-row">
              <div>{t("labels-time")}</div>
              <div>{orderData?.time}</div>
            </Row>
          )}
        </Column>
      </ListBaseItem>
    </ListBlock>
  )
}

export default MarketOrderCard