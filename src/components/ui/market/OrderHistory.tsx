import React from "react";
import { HistoryOrderDto } from "types/market";
import MarketOrderCard from "./OrderCard";
import Column from "components/containers/Column";

const cancelableTimeDelta = 5 * 60 * 1000

const OrderHistory = ({ history }: {history: HistoryOrderDto[]}) => {
  return (
    <Column>
      {history.length && history.map((order: HistoryOrderDto) => (
        <MarketOrderCard order={order} key={order.uuid} isActive={(Date.now() - (new Date(order.createdAt)).valueOf()) < cancelableTimeDelta}/>
      ))}
    </Column>
  )
}

export default OrderHistory