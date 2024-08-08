import type { CSSProperties, ChangeEventHandler } from "react";
import React, { useEffect, useState } from "react";

import classNames from "classnames";

import { iconInputScan } from "assets/icons/inputs";

import useLanguage from "hooks/useLanguage";

import { parseTonTransferUrl } from "utils/formatter";

import QrButton from "../buttons/qrButton";
import Row from "../containers/Row";
import Block from "../typography/Block";
import "./Input.styles.css";

interface AddressInputProps {
  onChange?: ChangeEventHandler<HTMLElement>;
  style?: CSSProperties;
  className?: string;
  value?: string;
  disabled?: boolean;
}

function AddressInput({ onChange, style, className, value, disabled }: AddressInputProps) {
  const t = useLanguage("input");
  const [qrText, setQrText] = useState<string | undefined>();
  // const isTma = useAppSelector(selectIsTma);
  // const qrScanner = useQRScanner();

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

  useEffect(() => {
    if (qrText) {
      if (onChange) {
        const address = parseTonTransferUrl(qrText);
        if (address) {
          onChange({
            target: {
              value: address,
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      }
    }
  }, [qrText]);

  return (
    // <div className={classNames('form-input', className)}>
    <Block direction="row" className={classNames("form-input", className)}>
      <input
        type="text"
        placeholder={t("address")}
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
          }}
        >
          {t("paste")}
        </a>
        <QrButton icon={iconInputScan} onChange={(s: string | undefined) => setQrText(s)} />
      </Row>
    </Block>
  );
}

export default AddressInput;
