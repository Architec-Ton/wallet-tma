import React, { useMemo } from "react";

import { useGetStonFiAssetQuery } from "features/stonfi/stonFiApi";
import type { CoinDto } from "types/assest";

import useLanguage from "hooks/useLanguage";

import { TON_JETTON } from "../../../constants";
import "./styles.css";

interface AssetsProps {
  assets: CoinDto[];
}

function Assets({ assets }: AssetsProps) {
  const t = useLanguage("assets");

  if (!assets) return null;

  return (
    <section>
      <h1 className="assets-v2__header">{t("title")}</h1>
      <div className="assets-v2__container">
        {assets.map((asset) => (
          <Asset
            assetImage={asset.meta?.image ? asset.meta?.image : `data:image;base64, ${asset.meta?.imageData}`}
            assetAddress={asset.type === "ton" ? TON_JETTON : asset.meta?.address}
            assetName={asset.meta?.name}
            assetAmount={asset.amount}
            assetSymbol={asset.meta?.symbol}
          />
        ))}
      </div>
    </section>
  );
}

const Asset = ({
  assetImage,
  assetAmount,
  assetAddress,
  assetName,
  assetSymbol,
}: {
  assetImage: string;
  assetAmount: number;
  assetAddress?: string;
  assetName?: string;
  assetSymbol?: string;
}) => {
  const { data, isSuccess } = useGetStonFiAssetQuery(assetAddress, {
    skip: !assetAddress,
  });

  // HACK: используем французкий для разделения как в дизайне
  const lang = "fr-FR"; // params.initData?.user?.languageCode;

  const { assetPriceNumber, assetPriceUsd } = useMemo(() => {
    if (!data || !data.asset || !isSuccess) return { assetPriceNumber: undefined, assetPriceUsd: undefined };
    const price = data.asset.dex_usd_price || data.asset.third_party_price_usd;

    if (!price) return { assetPriceNumber: undefined, assetPriceUsd: undefined };

    const numPriceUsd = Number(price);

    return {
      assetPriceNumber: numPriceUsd,
      assetPriceUsd: new Intl.NumberFormat(lang, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true,
      })
        .format(numPriceUsd)
        .replace(/\s/g, " "),
    };
  }, [data, isSuccess]);

  const fullPriceUsd = useMemo(() => {
    if (!assetPriceUsd) return undefined;

    return new Intl.NumberFormat(lang, {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true,
    })
      .format(assetPriceNumber * assetAmount)
      .replace(/\s/g, " ");
  }, [assetPriceNumber, assetAmount, assetPriceUsd]);

  const formattedAmount = new Intl.NumberFormat(lang, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  })
    .format(assetAmount)
    .replace(/\s/g, " ");

  return (
    <div className="assets-v2__item">
      <div className="assets-v2__item-image-container">
        <img draggable="false" className="assets-v2__item-image" src={assetImage} alt={assetSymbol} />
      </div>
      <div className="assets-v2__item-info-container">
        <div className="assets-v2__item-info-row">
          <div className="assets-v2__bold-text">{assetName}</div>
          <div className="assets-v2__bold-text">{formattedAmount}</div>
        </div>
        <div className="assets-v2__item-info-row">
          <div className="assets-v2__default-text">{assetPriceUsd ? `$ ${assetPriceUsd}` : ""}</div>
          <div className="assets-v2__default-text">{fullPriceUsd ? `$ ${fullPriceUsd}` : ""}</div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
