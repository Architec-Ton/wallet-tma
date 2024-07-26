import { ReactNode } from "react";
// import { NavLink } from 'react-router-dom';
import useLanguage from "../../../hooks/useLanguage";
import Section from "../../containers/Section";
import ListBlock from "../listBlock";
import "./Balance.styles.css";
import { CoinDto } from "../../../types/assest";
import ListTileItem from "../listBlock/ListTileItem";
import PriceChanges from "../../typography/PriceChanges";
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
          {assets.map((asset, index) => {
            return (
              <ListTileItem
                key={`${asset.meta?.address}-${index}`}
                icon={
                  asset.meta?.image
                    ? asset.meta?.image
                    : `data:image;base64, ${asset.meta?.imageData}`
                }
                title={asset.meta?.name}
                description={`${asset.amount?.toLocaleString(undefined, {
                  maximumFractionDigits: 5, //asset.meta?.decimals,
                  minimumFractionDigits: 2,
                })} ${asset.meta?.symbol}`}
                // onClick={assetClickHandler(asset)}
              >
                {asset.usdPrice > 0 && (
                  <div className="list-block__right">
                    <div className="list-block__title">
                      {asset.usdPrice?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      {" $"}
                    </div>
                    <div className="list-block__descriptio11n">
                      <PriceChanges changePrice={asset.changePrice} />
                    </div>
                  </div>
                )}
              </ListTileItem>
            );
          })}
          {/* <ListBaseItem className="center">
            <NavLink to="#">See more</NavLink>
          </ListBaseItem> */}
        </ListBlock>
        {children}
      </Section>
    );
  }
}

export default Assets;
