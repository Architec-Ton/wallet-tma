import classNames from 'classnames';
import './Input.styles.css';
import { CSSProperties, ChangeEventHandler } from 'react';
import Block from '../typography/Block';

interface InputProps {
  prefix?: string | React.ReactNode;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLElement>;
  style?: CSSProperties;
  className?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
}

function Input({
  prefix,
  placeholder,
  onChange,
  style,
  className,
  value,
  type,
  disabled,
}: InputProps) {

  return (
    // <div className={classNames('form-input', className)}>
    <Block direction="row" className={classNames('form-input', className)}>
      {prefix && <span >{prefix}</span>}
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        style={style}
        value={value}
        disabled={disabled}
      />
    </Block>
  );
}

export default Input;
