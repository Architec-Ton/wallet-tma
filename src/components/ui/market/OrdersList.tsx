import React, { useCallback } from "react";
import { MarketOrderDto, OrderStatus } from "types/market";
import MarketOrderCard from "./OrderCard";
import Column from "components/containers/Column";

const cancelableTimeDelta = 5 * 60 * 1000

const OrdersList = ({ orders, onOrderCancel }: {
  orders: MarketOrderDto[],
  onOrderCancel: (uuid: string) => void,
}) => {
  const cancelHandler = useCallback((uuid: string) => {
    onOrderCancel(uuid)
  }, [orders])

  return (
    <Column>
      {orders.length && orders.map((order: MarketOrderDto) => (
        <MarketOrderCard order={order} key={order.uuid} isActive={order.status === OrderStatus.CREATED} onCancel={cancelHandler}/>
      ))}
    </Column>
  )
}

export default OrdersList