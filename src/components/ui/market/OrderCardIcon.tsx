import React from "react";

import classNames from "classnames";
import { MarketOrderDto } from "types/market";

import AssetIcon from "../assets/AssetIcon";

const OrderCardIcon = ({ order, className }: { order: MarketOrderDto; className?: string }) => {
  return (
    <div className={classNames("card-icon-container", className)}>
      <AssetIcon asset={order.fromAsset} className="primary-icon" />
      <AssetIcon asset={order.toAsset} className="secondary-icon" />
    </div>
  );
};

export default OrderCardIcon;
