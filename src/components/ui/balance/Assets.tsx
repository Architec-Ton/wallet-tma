import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import useLanguage from "../../../hooks/useLanguage";
import Section from "../../containers/Section";
import ListBlock from "../listBlock";
import "./Balance.styles.css";
import { CoinDto } from "../../../types/assest";
import ListTileItem from "../listBlock/ListTileItem";
import PriceChanges from "../../typography/PriceChanges";
import ListBaseItem from "../listBlock/ListBaseItem";

type Props = {
  children?: ReactNode;
  assets: CoinDto[];
};

function Assets({ children, assets }: Props) {
  //   const ton = useTon();
  const t = useLanguage("assets");
  //   const navigate = useNavigate();

  //   const assets: AssetType[] = [
  //     {
  //       thumb: iconTon,
  //       title: "TON",
  //       description: "31,0407843 TON",
  //       wallet: "UQWQCHDSDNsfjiASXDSOsdUNPxlRi-GBmsdpaskow-7bgC",
  //       coin: "Toncoin",
  //     },
  //     {
  //       thumb: iconUsdt,
  //       title: "USDT",
  //       description: "221,4215 USDT",
  //       wallet: "UQWQCHDSDNsfjiASXDSOsdUNPxlRi-GBmsdpaskow-8bgB",
  //       coin: "USDTcoin",
  //     },
  //   ];

  //   const assetClickHandler = useClosure(
  //     (asset: CoinDto) => {
  //       //   navigate("/add-crypto/address", {
  //       //     state: asset,
  //       //   });
  //     },
  //     [assets]
  //   );
  console.log(assets);
  if (assets) {
    return (
      <Section title={t("title")} className="add-crypto__container">
        <ListBlock>
          {assets.map((asset, index) => {
            return (
              <ListTileItem
                key={`${asset.meta?.address}-${index}`}
                icon={asset.meta?.image}
                title={asset.meta?.name}
                description={`${asset.amount.toLocaleString(undefined, {
                  maximumFractionDigits: asset.meta?.decimals,
                  minimumFractionDigits: 2,
                })} ${asset.meta?.symbol}`}
                // onClick={assetClickHandler(asset)}
              >
                <div className="list-block__right">
                  <div className="list-block__title">
                    {asset.usdPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    {" $"}
                  </div>
                  <div className="list-block__descriptio11n">
                    <PriceChanges changePrice={asset.changePrice} />
                  </div>
                </div>
              </ListTileItem>
            );
          })}
          <ListBaseItem className="center">
            <NavLink to="#">See more</NavLink>
          </ListBaseItem>
        </ListBlock>
        {children}
      </Section>
    );
  }
  // const assetClickHandler = useClosure(
  //   (asset: AssetType) => {
  //     navigate("/add-crypto/address", {
  //       state: asset,
  //     });
  //   }
  // );

  // return (
  //   <Section title={t("title")} className="add-crypto__container">
  //     <ListBlock>
  //       {assets.map((asset, index) => {
  //         return (
  //           <ListBlockItem
  //             key={`${asset.title}-${index}`}
  //             thumb={asset.thumb}
  //             title={asset.title}
  //             description={asset.description}
  //             onClick={assetClickHandler(asset)}
  //           />
  //         );
  //       })}
  //     </ListBlock>
  //     {children}
  //   </Section>
  // );
}

export default Assets;
