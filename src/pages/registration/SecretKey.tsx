import { useEffect, useState } from "react";
import { iconButtonCopyColor } from "../../assets/icons/buttons/index.ts";
import Button from "../../components/buttons/Button.tsx";
import Column from "../../components/containers/Column.tsx";
import Page from "../../components/containers/Page.tsx";
import Block from "../../components/typography/Block.tsx";
import useLanguage from "../../hooks/useLanguage.ts";
import { useTmaMainButton } from "../../hooks/useTma.ts";
import "./SecretKey.styles.css";
import { usePage } from "../../hooks/usePage.ts";
import useRouter from "../../hooks/useRouter.ts";
import { mnemonicNew } from "@ton/crypto";
import { useDispatch } from "react-redux";
import { showAlert } from "../../features/alert/alertSlice.ts";

const SecretKey = () => {
  const t = useLanguage("Key");
  const navigate = useRouter();
  const btn = useTmaMainButton();
  const page = usePage();
  const [mnemonic, setMnemonic] = useState<string>("");
  const dispatch = useDispatch();
  //const [mnemonic, setMnemonic] = useLocalStorage<string>("mnemonic", '');

  useEffect(() => {
    mnemonicNew(24).then((m) => {
      setMnemonic(m.join(" "));
      page.setLoading(false, false);
      btn.init(t("next", "button"), () =>
        navigate("/registration/confirm-secret-key", {
          state: { mnemonic: m.join(" "), confirm: true },
        })
      );
    });
  }, []);

  useEffect(() => {
    if (mnemonic) {
      btn.init(t("next", "button"), () =>
        navigate("/registration/confirm-secret-key", {
          state: { mnemonic: mnemonic, confirm: true },
        })
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
          <Button
            icon={iconButtonCopyColor}
            title={t("Copy", "button")}
            primary={false}
            onClick={copyToClipboard}
          />
        </div>
      </Column>
    </Page>
  );
};

export default SecretKey;
