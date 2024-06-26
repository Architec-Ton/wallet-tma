import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { iconTon, iconUsdt } from "../../../assets/icons/jettons";
import { useClosure } from "../../../hooks/useClosure";
import useLanguage from "../../../hooks/useLanguage";
import { AssetType } from "../../../pages/addCrypto/ReceiveAsset";
import Section from "../../containers/Section";
import ListBlock from "../listBlock";
import ListBlockItem from "../listBlock/ListBlockItem";
import "./Balance.styles.css";

type Props = {
  children?: ReactNode;
};

function Assets({ children }: Props) {
  //   const ton = useTon();
  const t = useLanguage("assets");
  const navigate = useNavigate();

  const assets: AssetType[] = [
    {
      thumb: iconTon,
      title: "TON",
      description: "31,0407843 TON",
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
            <ListBlockItem
              key={`${asset.title}-${index}`}
              thumb={asset.thumb}
              title={asset.title}
              description={asset.description}
              onClick={assetClickHandler(asset)}
            />
          );
        })}
      </ListBlock>
      {children}
    </Section>
  );
}

export default Assets;
