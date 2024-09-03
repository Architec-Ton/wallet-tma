import React, { useMemo } from "react";
import ListBlock from "../listBlock";
import ListBaseItem from "../listBlock/ListBaseItem";
import Column from "components/containers/Column";
import Row from "components/containers/Row";
import { HistoryOrderDto } from "types/market";
import { formatDate } from "date-fns";

import "./OrderCard.styles.css"

type OwnPropsType = {
  order: HistoryOrderDto
  isActive?: boolean
}

const MarketOrderCard = ({ order, isActive = false }: OwnPropsType) => {
  const orderData = useMemo(() => {
    if (order) {
      const { createdAt } = order
      return {
        ...order,
        date: formatDate(new Date(createdAt).toString(), "dd MMMM yyyy")
      }
    }
  }, [order])
  return (
    <ListBlock className="market-order-card">
      <ListBaseItem>
        {orderData && (
          <>
            <div className="card-icon-container">
              <img src={orderData.fromAsset.meta?.image} alt="" className="primary-icon" />
              <img src={orderData.toAsset.meta?.image} alt="" className="secondary-icon" />
            </div>
            <Column className="grow">
              <div>{orderData.fromValue} {orderData.fromAsset.meta?.symbol}</div>
              <div className="secondary-content text-sm">{orderData.toValue} {orderData.toAsset.meta?.symbol}</div>
            </Column>
            {isActive && <button className="small-button rounded-button primary-button">Cancel</button>}
          </>
        )}
      </ListBaseItem>
      <ListBaseItem>
        <Column className="w-full">
          <Row className="order-data-row">
            <div>Type</div>
            <div>{orderData?.type}</div>
          </Row>
          <Row className="order-data-row">
            <div>Date</div>
            <div>{orderData?.date}</div>
          </Row>
          <Row className="order-data-row">
            <div>Status</div>
            <div>{orderData?.status}</div>
          </Row>
        </Column>
      </ListBaseItem>
    </ListBlock>
  )
}

export default MarketOrderCard