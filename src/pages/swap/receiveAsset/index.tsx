import type { ChangeEvent } from "react";
import React from "react";

import type { CoinDto } from "types/assest";

import { iconOpenButton } from "assets/icons/buttons";

import useLanguage from "hooks/useLanguage";

import Row from "components/containers/Row";
import Section from "components/containers/Section";

import type { AssetDataType } from "..";

type OwnPropsType = {
  asset: AssetDataType;
  coin: CoinDto | undefined;
  sendedCoin: CoinDto | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  value: string;
  disabled: boolean;
};

const ReceiveAsset = ({ asset, coin, sendedCoin, disabled, onChange, onClick, value }: OwnPropsType) => {
  const t = useLanguage("swap");
  const decimals = 10 ** (coin?.meta?.decimals ? coin?.meta?.decimals : 0);
  const receivedCoinPrice =
    sendedCoin && coin && Math.round((sendedCoin.usdPrice / coin.usdPrice) * decimals) / decimals;
  return (
    <Section
      title={t("receive")}
      readMore={sendedCoin && coin && `1 ${sendedCoin.meta?.symbol} = ${receivedCoinPrice} ${coin.meta?.symbol}`}
    >
      <Row className="justify-between asset-row">
        <Row className="asset-button asset-receive-button" onClick={onClick}>
          {asset.icon && <img src={asset.icon} alt="" className="asset-icon" />}
          <div className="asset-title">{asset.title || t("select")}</div>
          <img src={iconOpenButton} alt="" className="asset-open-icon" />
        </Row>
      </Row>
      <Row className="justify-between asset-data-row">
        <input
          type="number"
          value={value}
          className="asset-input"
          onChange={onChange}
          placeholder="0"
          disabled={disabled}
        />
        <div className="asset-feat-value">
          {coin &&
            (coin.usdPrice * Number(value)).toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })}
        </div>
      </Row>
    </Section>
  );
};

export default ReceiveAsset;
