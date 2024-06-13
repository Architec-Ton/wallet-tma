import classNames from 'classnames';
import './Input.styles.css';
import { CSSProperties, ChangeEventHandler } from 'react';
import Block from '../typography/Block';

interface InputProps {
  prefix?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLElement>;
  style?: CSSProperties;
  className?: string;
  value?: string;
}

function Input({
  prefix,
  placeholder,
  onChange,
  style,
  className,
  value,
}: InputProps) {
  return (
    // <div className={classNames('form-input', className)}>
    <Block direction="row" className={classNames('form-input', className)}>
      {prefix && <span>{prefix}</span>}
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        style={style}
        value={value}
      />
    </Block>
  );
}

export default Input;
