import { CSSProperties, ReactNode } from 'react';
import { iconOpenButton } from '../../assets/icons/buttons';
import Row from '../../components/containers/Row';
import Section from '../../components/containers/Section';
import { CoinDto } from '../../types/assest';
import classNames from 'classnames';
import useLanguage from '../../hooks/useLanguage';
import './AssetInput.styles.css';

interface AssetInputProps {
  asset?: CoinDto;
  style?: CSSProperties;
  className?: string;
  value: string;
  title?: string;
  subTitle?: string;
  // setValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  error?: boolean;
  children?: ReactNode;
  onChange?: (value: string) => void;
  onBlur?: () => void
  isSelectable?: boolean;
}

const AssetInput = ({
  asset,
  style,
  className,
  value,
  title,
  subTitle,
  onChange,
  onBlur,
  disabled,
  error,
  isSelectable,
  children,
}: AssetInputProps) => {
  const t = useLanguage('input');

  const handlerOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.currentTarget.value);
  };

  return (
    <Section
      className={classNames('asset-section', className)}
      title={title}
      readMore={subTitle}
      // readMore={`${t('balance')}: ${
      //   (asset &&
      //     (Number(asset?.amount) - Number(value)).toLocaleString(undefined, {
      //       maximumFractionDigits: 3,
      //     })) ||
      //   0
      // }`}
    >
      <Row className="justify-between asset-row">
        <Row className={classNames("asset-button asset-send-button", { "not-selectable": !isSelectable })}>
          {asset && (
            <img
              src={
                asset?.meta?.imageData
                  ? `data:image;base64, ${asset.meta?.imageData}`
                  : asset?.meta?.image
              }
              alt=""
              className="asset-icon"
            />
          )}
          <div className="asset-title">
            {asset?.meta?.symbol || t('select')}
          </div>{' '}
          {isSelectable && <img src={iconOpenButton} alt="" className="asset-open-icon" />}
        </Row>
        <Row className="controls-container">{children}</Row>
      </Row>
      <Row className="justify-between asset-data-row">
        <input
          type="numeric"
          value={value}
          style={style}
          className={classNames('asset-input', {
            error: !!error,
          })}
          onChange={handlerOnChange}
          onBlur={onBlur}
          placeholder="0"
          disabled={disabled}
        />
        <div className="asset-feat-value">
          {asset &&
            !error &&
            asset.usdPrice > 0 &&
            ((asset.usdPrice / asset.amount) * Number(value)).toLocaleString(
              undefined,
              {
                style: 'currency',
                currency: 'USD',
              }
            )}
        </div>
      </Row>
    </Section>
  );
};

export default AssetInput;
