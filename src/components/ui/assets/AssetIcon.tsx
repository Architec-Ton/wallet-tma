import React from "react";
import { CoinDto } from "types/assest";

const AssetIcon = ({asset, className}: {
  asset: CoinDto,
  className: string,
}) => {
  return (
    <img
      src={asset?.meta?.image || asset?.meta?.imageData && `data:image/png;base64, ${asset?.meta?.imageData}`}
      alt=""
      className={className}
    />
  )
}

export default AssetIcon