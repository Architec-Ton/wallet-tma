import { ChangeEvent, useEffect } from "react";

import useLanguage from "../../../hooks/useLanguage";
import { CoinDto } from "../../../types/assest";
import Column from "../../containers/Column";
import { SuffixInput } from "../../inputs/SuffixInput";
import "./TransferAssets.styles.css";

type OwnPropsType = {
  asset?: CoinDto;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
  setMaxAmount?: () => void;
};

const TransferAsset = ({ asset, disabled, onChange, value, setMaxAmount }: OwnPropsType) => {
  // const [assetValue, setAssetValue] = useState<string>('');
  // const [error, setError] = useState<boolean>(false);

  const t = useLanguage("input");

  useEffect(() => {
    // setAssetValue(value || '');
  }, [value]);

  return (
    <Column className="justify-between asset-row">
      <div className="trans"></div>
      <SuffixInput
        suffix={asset?.meta?.symbol}
        onChange={onChange}
        value={value}
        className="transfer-input"
        disabled={disabled}
      />
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
