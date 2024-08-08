import type { CSSProperties, ChangeEventHandler, ClipboardEventHandler } from "react";
import React from "react";

import classNames from "classnames";

import Block from "../typography/Block";
import "./Input.styles.css";

interface InputProps {
  prefix?: string | React.ReactNode;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLElement>;
  onPaste?: ClipboardEventHandler<HTMLInputElement>;
  style?: CSSProperties;
  className?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
}

function Input({ prefix, placeholder, onChange, onPaste, style, className, value, type, disabled }: InputProps) {
  return (
    // <div className={classNames('form-input', className)}>
    <Block direction="row" className={classNames("form-input", className)}>
      {prefix && <span>{prefix}</span>}
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        style={style}
        value={value}
        disabled={disabled}
        onPaste={onPaste}
      />
    </Block>
  );
}

export default Input;
