import type { ChangeEvent } from "react";
import React, { useEffect, useMemo } from "react";

import type { CoinDto } from "types/assest";

import useLanguage from "hooks/useLanguage";

import { usdPriceFormatter } from "utils/formatter";

import Column from "../../containers/Column";
import { SuffixInput } from "../../inputs/SuffixInput";
import "./TransferAssets.styles.css";

type OwnPropsType = {
  asset?: CoinDto;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
  setMaxAmount?: () => void;
  assetPrice?: string;
};

const TransferAsset = ({ asset, disabled, onChange, value, setMaxAmount, assetPrice }: OwnPropsType) => {
  // const [assetValue, setAssetValue] = useState<string>('');
  // const [error, setError] = useState<boolean>(false);

  const t = useLanguage("input");

  useEffect(() => {
    // setAssetValue(value || '');
  }, [value]);

  const formatedPrice = useMemo(() => {
    return usdPriceFormatter(Number(assetPrice));
  }, [assetPrice]);

  return (
    <Column className="justify-between asset-row send-asset-row">
      <div className="trans" />
      <SuffixInput
        suffix={asset?.meta?.symbol}
        onChange={onChange}
        value={value}
        className="transfer-input"
        disabled={disabled}
      />
      {assetPrice && (
        <div className="asset-price">
          1 {asset?.meta?.symbol} &asymp; {formatedPrice}
        </div>
      )}
      <button
        className="rounded-button control-button"
        style={{
          margin: "0 auto 0 0",
        }}
        onClick={setMaxAmount}
        disabled={!asset}
      >
        {t("max")}
      </button>
    </Column>
  );
};

export default TransferAsset;
