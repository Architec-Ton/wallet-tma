//@ts-nocheck
//@ts-ignore
import {
  CSSProperties,
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { iconOpenButton } from '../../assets/icons/buttons';
import Row from '../../components/containers/Row';
import Section from '../../components/containers/Section';
import { CoinDto } from '../../types/assest';
import classNames from 'classnames';
import useLanguage from '../../hooks/useLanguage';
import './AssetInput.styles.css';

interface AssetInputProps {
  asset: CoinDto;
  onChange?: ChangeEventHandler<HTMLElement>;
  style?: CSSProperties;
  className?: string;
  value?: string;
  disabled?: boolean;
  children: ReactNod;
}

const AssetInput = ({
  asset,
  onChange,
  style,
  className,
  value,
  disabled,
  children,
}: AssetInputProps) => {
  const [assetValue, setAssetValue] = useState<string>('');

  const t = useLanguage('input');

  useEffect(() => {
    setAssetValue(value || '');
  }, [value]);

  return (
    <Section
      className="asset-section"
      title={t('send')}
      readMore={`${t('balance')}: ${
        (asset &&
          (Number(asset?.amount) - Number(assetValue)).toLocaleString(
            undefined,
            { maximumFractionDigits: 3 }
          )) ||
        0
      }`}>
      <Row className="justify-between asset-row">
        <Row className="asset-button asset-send-button">
          {asset && (
            <img src={asset?.meta?.image} alt="" className="asset-icon" />
          )}
          <div className="asset-title">
            {asset?.meta?.symbol || t('select')}
          </div>{' '}
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

export default AssetInput;
