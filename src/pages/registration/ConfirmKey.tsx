import React, { useEffect, useMemo, useState } from "react";
import Column from "../../components/containers/Column.tsx";
import Page from "../../components/containers/Page.tsx";
import Input from "../../components/inputs/Input.tsx";
import useLanguage from "../../hooks/useLanguage.ts";
import "./ConfirmKey.styles.css";
import { usePage } from "../../hooks/usePage.ts";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { useTmaMainButton } from "../../hooks/useTma.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { useTon } from "../../hooks/useTon/index.ts";
import { WalletContractV4 } from "@ton/ton";
import usePinCodeModalManagement from "../../hooks/useTon/usePinCodeModal.ts";
import { encodePrivateKeyByPin } from "../../utils/pincode.ts";
import useLocalStorage from "../../hooks/useLocalStorage.ts";
import { WalletsState } from "../../types/auth.ts";

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const ConfirmKey: React.FC = () => {
  const t = useLanguage("Confirm");
  const navigate = useNavigate();
  const page = usePage();
  const ton = useTon();
  const btn = useTmaMainButton();
  const { state } = useLocation(); // state is any or unknown

  const [mnemonics, setMnemonics] = useState<string[]>([]);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>(Array(3).fill(""));
  const [mnemonicsVerifyIdx, setMnemonicsVerifyIdx] = useState<number[]>([
    3, 7, 17,
  ]);

  const [storedValue, setStoredValue] = useLocalStorage<WalletsState>("wData", {
    currentWallet: -1,
    wallets: [],
  });

  console.log("storedValue", storedValue);

  const [showPinCode, setShowPinCode] = useState<boolean>(false);

  const pincode = usePinCodeModalManagement();

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newInputs = [...inputs];
      newInputs[index] = event.target.value;
      setInputs(newInputs);
    };

  const setupPinCode = async (mnemonics: string[]) => {
    const pin1 = await pincode.open();

    if (!pin1) {
      // Wrong
      console.log("Something wrong");
      return;
    }

    const pin2 = await pincode.open();

    if (pin2 !== pin1) {
      // Wrong
      console.log("Pin incorrect");
      return;
    }

    // console.log("pin:", pin1);
    try {
      console.log("mnemonics", mnemonics);

      const keyPair = await mnemonicToPrivateKey(mnemonics);
      const privateHash = encodePrivateKeyByPin(mnemonics, pin1);

      // console.log("keyPair", keyPair);
      // console.log("privateHash", privateHash);

      //Use v4 by default
      const workchain = 0; // Usually you need a workchain 0
      const wallet = WalletContractV4.create({
        workchain,
        publicKey: keyPair.publicKey,
      });
      setStoredValue({
        currentWallet: 0,
        wallets: [
          {
            network: "ton",
            mode: "mnemonics",
            publicKey: keyPair.publicKey.toString("hex"),
            address: wallet.address.toString({
              urlSafe: true,
              bounceable: true,
            }),
            privateKey: privateHash,
          },
        ],
      });
      ton.setAddress(
        wallet.address.toString({ urlSafe: true, bounceable: true }),
        "mnemonics",
        keyPair.publicKey.toString("hex"),
        privateHash
      );
    } catch (e) {
      console.log("Coding wrong", e);
    } finally {
      setIsConfirmed(true);
    }
  };

  const confirmHandler = (mnemonics: string[]) => {
    // if (verificationStep == 0) {
    console.log("mnemonicsVerifyIdx", mnemonicsVerifyIdx);
    const checkMnemonics = mnemonicsVerifyIdx.map(
      (v, index) => mnemonics[v] == inputs[index].toLowerCase()
    );
    if (!checkMnemonics.every((v) => Boolean(v))) {
      console.log("Wrong inputs", checkMnemonics, inputs, mnemonicsVerifyIdx);
      // return;
    }
    btn.setVisible(false);

    setupPinCode(mnemonics);
  }; //, [mnemonics, mnemonicsVerifyIdx, inputs, verificationStep]);

  const description = useMemo(
    () => (
      <p>
        {t("description")}{" "}
        <span>{mnemonicsVerifyIdx.map((v) => v + 1).join(", ")}</span>
      </p>
    ),
    [mnemonics, mnemonicsVerifyIdx, inputs]
  );

  useEffect(() => {
    const randomIdx = Array(3)
      .fill(0)
      .map(() => randomInt(0, 23));
    console.log("rand:", randomIdx);
    setMnemonicsVerifyIdx(randomIdx);
    const mnemonics = state.mnemonic.split(" ");
    if (state) {
      console.log("state", state.mnemonic.split(" "));
      setMnemonics(mnemonics);
    } else {
      console.log("no state", state);
    }
    if (!state?.confirm) {
      setShowPinCode(true);
    }
    page.setLoading(false, false);

    if (state?.confirm) {
      btn.init(t("next", "button"), () => {
        confirmHandler(mnemonics);
      });
    } else {
      setupPinCode(mnemonics);
    }
  }, []);

  useEffect(() => {
    if (isConfirmed) navigate("/registration/completed");
  }, [isConfirmed]);

  return (
    <Page title={t("confirm-mnemonics")}>
      {description}
      {!showPinCode && (
        <Column>
          <div className="container">
            {mnemonicsVerifyIdx.map((number, index) => (
              <label key={index}>
                <Input
                  prefix={`${number + 1}.`}
                  key={number}
                  onChange={handleChange(index)}
                />
              </label>
            ))}
          </div>
        </Column>
      )}
    </Page>
  );
};

export default ConfirmKey;
