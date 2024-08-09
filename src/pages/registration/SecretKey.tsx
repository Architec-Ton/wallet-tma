import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { mnemonicNew } from "@ton/crypto";
import { showAlert } from "features/alert/alertSlice";

import { iconButtonCopyColor } from "assets/icons/buttons/index";

import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import useRouter from "hooks/useRouter";
import { useTmaMainButton } from "hooks/useTma";

import Button from "components/buttons/Button";
import Column from "components/containers/Column";
import Page from "components/containers/Page";
import Block from "components/typography/Block";

import "./SecretKey.styles.css";

const SecretKey = () => {
  const t = useLanguage("Key");
  const navigate = useRouter();
  const btn = useTmaMainButton();
  const page = usePage();
  const [mnemonic, setMnemonic] = useState<string>("");
  const dispatch = useDispatch();
  // const [mnemonic, setMnemonic] = useLocalStorage<string>("mnemonic", '');

  useEffect(() => {
    mnemonicNew(24).then((m) => {
      setMnemonic(m.join(" "));

      page.setLoading(false, false);

      btn.init(t("next", "button"), () =>
        navigate("/registration/confirm-secret-key", {
          state: { mnemonic: m.join(" "), confirm: true },
        }),
      );
    });
  }, []);

  useEffect(() => {
    if (mnemonic) {
      btn.init(t("next", "button"), () =>
        navigate("/registration/confirm-secret-key", {
          state: { mnemonic, confirm: false },
        }),
      );
    }
  }, [mnemonic]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(mnemonic)
      .then(() => {
        dispatch(showAlert({ message: "copy", duration: 1500 }));
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <Page title={t("your-secret-key")} hintMessage={t("your-secret-key-hint")}>
      <Column>
        <Block
          style={{
            display: "block",
          }}
        >
          <Column columns={2}>
            {mnemonic.split(" ").map((word, index) => (
              <div className="registration-mnemonic-word" key={index}>
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

export default SecretKey;
