import { ReactNode, useMemo } from "react";
// import { NavLink } from 'react-router-dom';
import useLanguage from "../../../hooks/useLanguage";
import Section from "../../containers/Section";
import ListBlock from "../listBlock";
import "./Balance.styles.css";
import { CoinDto } from "../../../types/assest";
import ListTileItem from "../listBlock/ListTileItem";
import PriceChanges from "../../typography/PriceChanges";
import { useGetStonFiAssetQuery } from "../../../features/stonfi/stonFiApi";
import { TON_JETTON } from "../../../constants";
// import ListBaseItem from '../listBlock/ListBaseItem';

type Props = {
  children?: ReactNode;
  assets: CoinDto[];
};

function Assets({ children, assets }: Props) {
  const t = useLanguage("assets");

  if (assets) {
    return (
      <Section title={t("title")} className="add-crypto__container">
        <ListBlock>
          {assets.map((asset, index) => (
            <Asset asset={asset} key={`${asset.meta?.address}-${index}`} />
          ))}
          {/* <ListBaseItem className="center">
            <NavLink to="#">See more</NavLink>
          </ListBaseItem> */}
        </ListBlock>
        {children}
      </Section>
    );
  }
}

const Asset = ({ asset }: { asset: CoinDto }) => {
  const assetAddress = asset.type === "ton" ? TON_JETTON : asset.meta?.address;
  const { data, isSuccess } = useGetStonFiAssetQuery(assetAddress, {
    skip: !assetAddress,
  });

  const fullPriceUsd = useMemo(() => {
    if (!data || !data.asset || !isSuccess) return undefined;

    const assetPriceUsd =
      data.asset.dex_usd_price || data.asset.third_party_price_usd;

    if (!assetPriceUsd) return undefined;

    const numPriceUsd = Number(assetPriceUsd);

    return Number(numPriceUsd * asset.amount).toFixed(2);
  }, [asset.meta?.address, isSuccess]);

  return (
    <ListTileItem
      icon={
        asset.meta?.image
          ? asset.meta?.image
          : `data:image;base64, ${asset.meta?.imageData}`
      }
      title={asset.meta?.name}
      description={`${asset.amount?.toLocaleString(undefined, {
        maximumFractionDigits: 5,
        minimumFractionDigits: 2,
      })} ${asset.meta?.symbol}`}
    >
      {fullPriceUsd && (
        <div className="list-block__right">
          <div className="list-block__title">{`${fullPriceUsd} $`}</div>
          <div className="list-block__description">
            <PriceChanges changePrice={asset.changePrice} />
          </div>
        </div>
      )}
    </ListTileItem>
  );
};

export default Assets;
