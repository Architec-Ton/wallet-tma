import React from "react";

import type { CoinDto } from "types/assest";

import Section from "../../containers/Section";
import ListBlock from "../listBlock";
import ListTileItem from "../listBlock/ListTileItem";

type OwnPropsType = {
  //   children: React.ReactNode;
  title: string;
  //   className?: string;
  assets: CoinDto[];
  onClick?: (asset: CoinDto) => void;
};

const AssetsList = ({ title, assets, onClick }: OwnPropsType) => (
  <Section title={title} className="add-crypto__container">
    <ListBlock>
      {assets.map((asset, index) => (
        <ListTileItem
          key={`${asset.meta?.address}-${index}`}
          icon={asset.meta?.image ? asset.meta?.image : `data:image;base64, ${asset.meta?.imageData}`}
          title={asset.meta?.name}
          description={`${asset.amount.toLocaleString(undefined, {
            maximumFractionDigits: 5, // asset.meta?.decimals,
            minimumFractionDigits: 2,
          })} ${asset.meta?.symbol}`}
          onClick={() => {
            if (onClick) onClick(asset);
          }}
        />
      ))}
    </ListBlock>
  </Section>
);

export default AssetsList;
