//@ts-nocheck
//@ts-ignore
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { iconOpenButton } from '../../../assets/icons/buttons';
import Row from '../../../components/containers/Row';
import Section from '../../../components/containers/Section';
import { CoinDto } from '../../../types/assest';
import classNames from 'classnames';
import useLanguage from '../../../hooks/useLanguage';

type OwnPropsType = {
  asset: CoinDto;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  forceChange: (v: string) => void;
  value: string;
  disabled: boolean;
};

const TransferAsset = ({
  asset,
  disabled,
  onChange,
  onClick,
  forceChange,
  value,
}: OwnPropsType) => {
  const [assetValue, setAssetValue] = useState<string>('');

  const t = useLanguage('swap');

  useEffect(() => {
    setAssetValue(value || '');
  }, [value]);

  const isInsuffucientBalance = useMemo(() => {
    return asset && asset.amount - Number(assetValue) < 0;
  }, [assetValue]);

  const clearHandler = () => {
    setAssetValue('');
    forceChange('');
  };

  const halfHandler = () => {
    const newValue = (asset.amount / 2).toString();
    setAssetValue(newValue);
    forceChange(newValue);
  };

  const maxHandler = () => {
    setAssetValue(asset.amount.toString());
    forceChange(asset.amount.toString());
  };

  return (
    <Section
      title={t('send')}
      readMore={`${t('balance')}: ${
        (asset &&
          (Number(asset?.amount) - Number(assetValue)).toLocaleString(
            undefined,
            { maximumFractionDigits: asset?.meta?.decimals }
          )) ||
        0
      }`}>
      <Row className="justify-between asset-row">
        <Row className="asset-button asset-send-button" onClick={onClick}>
          {asset && (
            <img src={asset.meta?.image} alt="" className="asset-icon" />
          )}
          <div className="asset-title">{asset.meta?.symbol || t('select')}</div>
          <img src={iconOpenButton} alt="" className="asset-open-icon" />
        </Row>
        <Row className="controls-container">
          <button
            className="rounded-button control-button"
            onClick={clearHandler}
            disabled={!asset}>
            {t('clear')}
          </button>
          <button
            className="rounded-button control-button"
            onClick={halfHandler}
            disabled={!asset || isInsuffucientBalance}>
            50%
          </button>
          <button
            className="rounded-button control-button"
            onClick={maxHandler}
            disabled={!asset || isInsuffucientBalance}>
            {t('max')}
          </button>
        </Row>
      </Row>
      <Row className="justify-between asset-data-row">
        <input
          type="string"
          value={assetValue}
          className={classNames('asset-input', {
            error: isInsuffucientBalance,
          })}
          onChange={onChange}
          placeholder="0"
          disabled={disabled}
        />
        <div className="asset-feat-value">
          {asset &&
            (asset.usdPrice * Number(assetValue)).toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
            })}
        </div>
      </Row>
    </Section>
  );
};

export default TransferAsset;
