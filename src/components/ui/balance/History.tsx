import { ReactNode } from "react";
import "./Balance.styles.css";
import Section from "../../containers/Section";
import ListBlock from "../listBlock";
import { iconTon, iconUsdt } from "../../../assets/icons/jettons";
import { AssetType } from "../../../pages/addCrypto/ReceiveAsset";
import { NavLink, useNavigate } from "react-router-dom";
import { useClosure } from "../../../hooks/useClosure";
import ListBlockItem from "../listBlock/ListBlockItem";
import useLanguage from "../../../hooks/useLanguage";
import ListBaseItem from "../listBlock/ListBaseItem";
import ListTileItem from "../listBlock/ListTileItem";

type Props = {
  children?: ReactNode;
};

function History({ children }: Props) {
  //   const ton = useTon();
  const t = useLanguage("history");
  const navigate = useNavigate();

  const assets: AssetType[] = [
    {
      thumb: iconTon,
      title: "Received",
      description: "UQWQCHD....w-7bgC",
      wallet: "UQWQCHDSDNsfjiASXDSOsdUNPxlRi-GBmsdpaskow-7bgC",
      coin: "Toncoin",
    },
    {
      thumb: iconUsdt,
      title: "USDT",
      description: "221,4215 USDT",
      wallet: "UQWQCHDSDNsfjiASXDSOsdUNPxlRi-GBmsdpaskow-8bgB",
      coin: "USDTcoin",
    },
  ];

  const assetClickHandler = useClosure(
    (asset: AssetType) => {
      navigate("/add-crypto/address", {
        state: asset,
      });
    },
    [assets]
  );

  return (
    <Section title={t("title")} className="add-crypto__container">
      <ListBlock>
        {assets.map((asset, index) => {
          return (
            <ListTileItem
              key={`${asset.title}-${index}`}
              icon={asset.thumb}
              title={asset.title}
              description={asset.description}
              onClick={assetClickHandler(asset)}
            >
              <div className="list-block__right">
                <div className="list-block__title">{" $"}</div>
                <div className="list-block__description"> data here</div>
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

export default History;
