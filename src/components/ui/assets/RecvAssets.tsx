import { useState } from 'react';
import { CoinDto } from '../../../types/assest';
import AssetInput from '../../inputs/AssetInput';
import useLanguage from '../../../hooks/useLanguage';

interface AssetInputProps {
  asset?: CoinDto;
  maxValue?: number;
  value: string;
  //   setValue: Dispatch<SetStateAction<number>>;
  onChange?: (value: string) => void;
}

const RecvAssetInput = ({
  asset,
  value,
  maxValue,
  onChange,
}: AssetInputProps) => {
  const [error, setError] = useState<boolean>(false);

  const handlerOnChange = (value: string) => {
    const sValue = Number(value);
    if (isNaN(sValue) || (maxValue && sValue > maxValue)) {
      setError(true);
    } else {
      setError(false);
    }
    if (onChange) {
      onChange(value);
    }
  };

  const t = useLanguage('input');

  return (
    <AssetInput
      title={t('recv')}
      subTitle={
        asset
          ? `${t('balance')}: ${asset?.amount.toLocaleString(undefined, {
              maximumFractionDigits: 3,
            })}`
          : ''
      }
      asset={asset}
      //   className={className}
      error={error}
      value={value}
      onChange={handlerOnChange}></AssetInput>
  );
};

export default RecvAssetInput;
