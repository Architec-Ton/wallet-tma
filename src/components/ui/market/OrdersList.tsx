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
        <MarketOrderCard
          key={order.uuid}
          order={order}
          disabled={[OrderStatus.CREATED, OrderStatus.EXECUTING, OrderStatus.CANCELING].includes(order.status)}
          isActive={ ![OrderStatus.CANCELED, OrderStatus.FINISHED].includes(order.status) }
          onCancel={cancelHandler}
        />
      ))}
    </Column>
  )
}

export default OrdersList