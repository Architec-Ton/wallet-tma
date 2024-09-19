import React, { useEffect, useState } from "react";

import { showAlert } from "features/alert/alertSlice";
import { selectAddressPrivateKey } from "features/ton/tonSelector";
import { TonConnectionMode, updatePrivateKey } from "features/ton/tonSlice";
import type { WalletsState } from "types/auth";

import { iconButtonCopyColor } from "assets/icons/buttons";
import { keyIcon, lockIcon } from "assets/icons/settings";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useLanguage from "hooks/useLanguage";
import useLocalStorage from "hooks/useLocalStorage";
import { usePage } from "hooks/usePage";
import { useTmaMainButton } from "hooks/useTma";
import { useTon } from "hooks/useTon";
import usePinCodeModalManagement from "hooks/useTon/usePinCodeModal";

import { decodePrivateKeyByPin, encodePrivateKeyByPin } from "utils/pincode";

import Button from "components/buttons/Button";
import TileButton from "components/buttons/TileButton";
import Column from "components/containers/Column";
import Page from "components/containers/Page";
import Block from "components/typography/Block";

function WalletSafety() {
  const t = useLanguage("account");
  const page = usePage();
  const ton = useTon();
  const dispatch = useAppDispatch();

  const privateHashKey = useAppSelector(selectAddressPrivateKey);

  const pincode = usePinCodeModalManagement();

  const [mnemonic, setMnemonic] = useState<string[]>([]);

  const [storedValue, setStoredValue] = useLocalStorage<WalletsState>("wData", {
    currentWallet: -1,
    wallets: [],
  });

  useEffect(() => {
    if (ton.mode === TonConnectionMode.tonconnect) {
      dispatch(showAlert({ message: `This function is only for Architec.ton wallets`, duration: 3000 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ton.mode]);

  useEffect(() => {
    page.setLoading(false, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewSecretKey = async () => {
    if (!privateHashKey) {
      dispatch(showAlert({ message: `Logic Error: can't find private key`, duration: 3000 }));
      return;
    }

    const pin = await pincode.open();

    if (pin === undefined) return;

    try {
      const decoded = decodePrivateKeyByPin(privateHashKey, pin);
      setMnemonic(decoded);
    } catch (e) {
      dispatch(showAlert({ message: `Logic Error: can't find private key`, duration: 3000 }));
      console.error(e);
    }

    // 0. if TON connect: disabled, show alert
    // 1. request pin
    // 2. if pin success show secret key like in figma
    // 3. if pin error handle it inside pin modal
  };

  const handleChangePin = async () => {
    if (!privateHashKey) {
      dispatch(showAlert({ message: `Error: can't check pincode`, duration: 3000 }));
      return;
    }

    dispatch(showAlert({ message: `Enter current PIN`, duration: 5000 }));
    const pin = await pincode.open();

    if (pin === undefined) return;

    let currentMnemonic: string[];

    try {
      currentMnemonic = decodePrivateKeyByPin(privateHashKey, pin);
    } catch (e) {
      dispatch(showAlert({ message: `Error: pincode is wrong`, duration: 3000 }));
      console.error(e);
    }

    dispatch(showAlert({ message: `Enter new PIN`, duration: 5000 }));
    const newPin = await pincode.open();

    dispatch(showAlert({ message: `Confirm new PIN`, duration: 5000 }));
    const newPinConfirm = await pincode.open();

    if (newPin !== newPinConfirm) {
      dispatch(showAlert({ message: `Pincode not the same, try again`, duration: 5000 }));
      return;
    }

    // @ts-ignore
    const newPrivateHash = encodePrivateKeyByPin(currentMnemonic, newPin);

    setStoredValue({
      ...storedValue,
      wallets: storedValue.wallets.map((wallet) => {
        if (wallet.privateKey === privateHashKey) {
          return {
            ...wallet,
            privateKey: newPrivateHash,
          };
        }
        return wallet;
      }),
    });

    dispatch(updatePrivateKey(newPrivateHash));
    dispatch(showAlert({ message: `Pincode successfully changed`, duration: 5000 }));
  };

  if (mnemonic.length > 0) {
    return <SecretKey mnemonic={mnemonic} close={() => setMnemonic([])} />;
  }

  return (
    <Page title={t("wallet-safety")}>
      <Column>
        <TileButton
          icon={lockIcon}
          title={t("change-pin")}
          onClick={handleChangePin}
          style={{ lineHeight: "2opx" }}
          disabled={ton.mode === TonConnectionMode.tonconnect}
        />

        <TileButton
          icon={keyIcon}
          title={t("view-secret-key")}
          onClick={handleViewSecretKey}
          style={{ lineHeight: "2opx" }}
          disabled={ton.mode === TonConnectionMode.tonconnect}
        />

        <p
          style={{
            fontWeight: "var(--font-regular)",
            fontSize: "var(--font-size-small)",
            lineHeight: "16px",
            letterSpacing: "0.2px",
            color: "var(--secondary-color)",
            padding: "0px var(--spacing-20)",
            margin: "-4px 0px 0px 0px",
          }}
        >
          {t("safety-disclaimer")}
        </p>
      </Column>
    </Page>
  );
}

export default WalletSafety;

const SecretKey = ({ mnemonic, close }: { mnemonic: string[]; close: () => void }) => {
  const dispatch = useAppDispatch();
  const t = useLanguage("Key");
  const btn = useTmaMainButton();

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(mnemonic.join(" "));
      dispatch(showAlert({ message: "Successfully copied", duration: 3000 }));
    } catch (e) {
      dispatch(showAlert({ message: "Failed to copy", duration: 3000 }));
    }
  };

  useEffect(() => {
    btn.init(t("back", "account"), close, true);

    return () => {
      btn.setVisible(false);
    };
  }, []);

  return (
    <Page title={t("your-secret-key")} hintMessage={t("your-secret-key-hint")}>
      <Column>
        <Block
          style={{
            display: "block",
          }}
        >
          <Column columns={2}>
            {mnemonic.map((word, index) => (
              <div className="registration-mnemonic-word" key={word}>
                <h2 style={{ textAlign: "left", marginLeft: "20%" }}>
                  {index + 1}. {word}
                </h2>
              </div>
            ))}
          </Column>
        </Block>
        <div className="center p-1">
          <Button icon={iconButtonCopyColor} title={t("Copy", "button")} primary={false} onClick={copyToClipboard} />
        </div>
      </Column>
    </Page>
  );
};
