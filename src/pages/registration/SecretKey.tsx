import { useEffect } from "react";
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
import {mnemonicNew} from "@ton/crypto";
import useLocalStorage from "../../hooks/useLocalStorage.ts";

const SecretKey = () => {
  const t = useLanguage("Key");
  const navigate = useRouter();
  const btn = useTmaMainButton();
  const page = usePage();
  const [mnemonic, setMnemonic] = useLocalStorage<string>("mnemonic", '');

  useEffect(() => {
    if (mnemonic === '') {
      mnemonicNew(24).then((mnemonic) => {
        setMnemonic(mnemonic.join(' '))
      })
    } else if (mnemonic.split(' ').length === 1) {
      console.log(mnemonic, 'aaa')
      navigate('/')
    }

    btn.init(
        t("next", "button"),
        () => navigate("/registration/confirm-secret-key"),
        true
    )
    page.setLoading(false)
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(mnemonic)
      //toDO алерт для тг .then(() => alert('Words copied to clipboard'))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <Page title={t("your-secret-key")} hintMessage={"here hint message"}>
      <Column>
        <Block
          style={{
            display: "block",
          }}
        >
          <Column columns={2}>
            {mnemonic.split(' ').map((word, index) => (
              <div className="registration-mnemonic-word" key={index}>
                <h2 style={{textAlign: 'left', marginLeft: '20%'}}>
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
