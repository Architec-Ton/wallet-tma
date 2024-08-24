import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";

import classNames from "classnames";
import Row from "components/containers/Row";

import "./ResponsiveInput.styles.css"

type ResponsiveInputPropsType = {
  warning?: boolean
  focus?: boolean
  value?: string
  onChangeHandler: (v: string) => void
  assetName?: string
}

const ResponsiveInput = ({assetName, onChangeHandler, warning, focus, value}: ResponsiveInputPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    }
  }, [focus])

  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangeHandler(e.currentTarget.value)
  };

  return (
    <Row className="responsive-input-container">
      <div
        className={classNames("responsive-input", { warning: warning })}
        onClick={onClick}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="0"
          inputMode="numeric"
        />
        <div className="asset-value">
          {value != "" && Number(value).toLocaleString(undefined).replaceAll(",", " ")}
        </div>
      </div>
      {assetName && <div className="responsive-input-title">{assetName}</div>}
    </Row>
  )
}

export default ResponsiveInput