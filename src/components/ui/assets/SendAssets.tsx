import { useState } from "react";
import { CoinDto } from "../../../types/assest";
import AssetInput from "../../inputs/AssetInput";
import useLanguage from "../../../hooks/useLanguage";

interface AssetInputProps {
  asset?: CoinDto;
  value: string;
  //   setValue: Dispatch<SetStateAction<number>>;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  isSelectable?: boolean;
}

const SendAssetInput = ({
  asset,
  value,
  isSelectable,
  onChange,
  onBlur,
}: AssetInputProps) => {
  const [error, setError] = useState<boolean>(false);

  const handlerOnChange = (value: string) => {
    const sValue = Number(value);
    if (isNaN(sValue) || (asset && sValue > asset?.amount)) {
      setError(true);
    } else {
      setError(false);
    }
    if (onChange) {
      onChange(value);
    }
  };

  const t = useLanguage("input");

  return (
    <AssetInput
      title={t("send")}
      subTitle={
        asset
          ? `${t("balance")}: ${asset?.amount?.toLocaleString(undefined, {
              maximumFractionDigits: 3,
            })}`
          : ""
      }
      asset={asset}
      //   className={className}
      error={error}
      value={value}
      isSelectable={isSelectable}
      onChange={handlerOnChange}
      onBlur={onBlur}
    >
      <button
        className="rounded-button control-button"
        onClick={() => {
          if (asset && onChange) onChange("0");
        }}
        disabled={!asset}
      >
        {t("clear")}
      </button>
      <button
        className="rounded-button control-button"
        onClick={() => {
          if (asset) {
            console.log("clicl", asset?.amount / 2);
            if (asset && onChange) onChange((asset?.amount / 2).toString());
          }
        }}
        disabled={error}
      >
        50%
      </button>
      <button
        className="rounded-button control-button"
        onClick={() => {
          if (asset && onChange) onChange(asset?.amount.toString());
        }}
        disabled={error}
      >
        {t("max")}
      </button>
    </AssetInput>
  );
};

export default SendAssetInput;
