import React from "react";
import { MarketOrderDto } from "types/market";
import MarketOrderCard from "./OrderCard";
import Column from "components/containers/Column";

const OrderHistory = ({ history }: {history: MarketOrderDto[]}) => {
  return (
    <Column>
      {history.length && history.map((order: MarketOrderDto) => (
        <MarketOrderCard order={order} key={order.date}/>
      ))}
    </Column>
  )
}

export default OrderHistory