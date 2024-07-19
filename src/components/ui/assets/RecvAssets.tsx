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
  onBlur?: () => void;
  isSelectable?: boolean;
  subTitle: string;
}

const RecvAssetInput = ({
  asset,
  value,
  maxValue,
  isSelectable,
  subTitle,
  onChange,
  onBlur,
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
      subTitle={subTitle}
      asset={asset}
      //   className={className}
      error={error}
      value={value}
      isSelectable={isSelectable}
      onChange={handlerOnChange}
      onBlur={onBlur}></AssetInput>
  );
};

export default RecvAssetInput;
