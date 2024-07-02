import classNames from 'classnames';
import './Input.styles.css';
import { CSSProperties, ChangeEventHandler } from 'react';
import Block from '../typography/Block';
import useLanguage from '../../hooks/useLanguage';
import { iconInputScan } from '../../assets/icons/inputs';
import Row from '../containers/Row';

interface AddressInputProps {
  onChange?: ChangeEventHandler<HTMLElement>;
  style?: CSSProperties;
  className?: string;
  value?: string;
  disabled?: boolean;
}

function AddressInput({
  onChange,
  style,
  className,
  value,
  disabled,
}: AddressInputProps) {
  const t = useLanguage('input');

  const handlePaste = async () => {
    const clipboardData = await navigator.clipboard.readText();
    if (onChange) {
      onChange({
        target: {
          value: clipboardData,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    // <div className={classNames('form-input', className)}>
    <Block direction="row" className={classNames('form-input', className)}>
      <input
        type="text"
        placeholder={t('address')}
        onChange={onChange}
        style={style}
        value={value}
        disabled={disabled}
      />
      <Row>
        <a
          className=""
          href="#"
          onClick={() => {
            handlePaste();
          }}>
          {t('paste')}
        </a>
        <a onClick={() => handlePaste} href="#">
          <img src={iconInputScan} />
        </a>
      </Row>
    </Block>
  );
}

export default AddressInput;
