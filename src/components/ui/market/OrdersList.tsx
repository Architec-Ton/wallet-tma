import React, { useCallback } from "react";
import { MarketOrderDto, OrderStatus } from "types/market";
import MarketOrderCard from "./OrderCard";
import Column from "components/containers/Column";
import DataLossBlock from "components/typography/DataLossBlock";
import useLanguage from "hooks/useLanguage";

const cancelableTimeDelta = 5 * 60 * 1000

const OrdersList = ({ orders, onOrderCancel }: {
  orders: MarketOrderDto[],
  onOrderCancel: (uuid: string) => void,
}) => {
  const t = useLanguage("market")
  const cancelHandler = useCallback((uuid: string) => {
    onOrderCancel(uuid)
  }, [orders])


  if (!orders.length) {
    return (
      <DataLossBlock>{t("my-orders-hint")}</DataLossBlock>
    )
  } 

  return (
    <Column>
      {orders.length && orders.map((order: MarketOrderDto) => (
        <MarketOrderCard order={order} key={order.uuid} isActive={order.status === OrderStatus.ACTIVE} onCancel={cancelHandler}/>
      ))}
    </Column>
  )
}

export default OrdersList