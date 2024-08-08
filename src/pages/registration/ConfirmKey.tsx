import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { mnemonicToPrivateKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";

import Column from "../../components/containers/Column";
import Page from "../../components/containers/Page";
import Input from "../../components/inputs/Input";
import { showAlert } from "../../features/alert/alertSlice";
import { TonConnectionMode } from "../../features/ton/tonSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import useLanguage from "../../hooks/useLanguage";
import useLocalStorage from "../../hooks/useLocalStorage";
import { usePage } from "../../hooks/usePage";
import useRouter from "../../hooks/useRouter";
import { useTmaMainButton } from "../../hooks/useTma";
import { useTon } from "../../hooks/useTon/index";
import usePinCodeModalManagement from "../../hooks/useTon/usePinCodeModal";
import type { WalletsState } from "../../types/auth";
import { encodePrivateKeyByPin } from "../../utils/pincode";
import "./ConfirmKey.styles.css";

// const randomInt = (min: number, max: number) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

const ConfirmKey: React.FC = () => {
  const t = useLanguage("Confirm");
  const navigate = useRouter();
  const page = usePage();
  const ton = useTon();
  const btn = useTmaMainButton();
  const dispatch = useAppDispatch();
  const { state } = useLocation(); // state is any or unknown

  const [mnemonics, setMnemonics] = useState<string[]>([]);
  // const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>(Array(3).fill(""));
  const [mnemonicsVerifyIdx, setMnemonicsVerifyIdx] = useState<number[]>([3, 7, 17]);

  const [storedValue, setStoredValue] = useLocalStorage<WalletsState>("wData", {
    currentWallet: -1,
    wallets: [],
  });

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const pincode = usePinCodeModalManagement();

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const setupPinCode = async (mnemonics: string[]) => {
    page.setLoading(false, false);
    btn.setVisible(false);

    const pin1 = await pincode.open();

    if (!pin1) {
      // Wrong
      dispatch(
        showAlert({
          message: "Pincode wrong.",
          duration: 8000,
        }),
      );
      navigate("/");
      return;
    }

    const pin2 = await pincode.open();

    if (pin2 != pin1) {
      // Wrong
      dispatch(
        showAlert({
          message: "Pincode not the same.",
          duration: 8000,
        }),
      );

      setupPinCode(mnemonics);
      return;
    }

    try {
      const keyPair = await mnemonicToPrivateKey(mnemonics);
      const privateHash = encodePrivateKeyByPin(mnemonics, pin1);

      // Use v4 by default
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
            mode: TonConnectionMode.mnemonics,
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
        wallet.address.toString({ urlSafe: true, bounceable: false }),
        TonConnectionMode.mnemonics,
        keyPair.publicKey.toString("hex"),
        privateHash,
      );
      setIsCompleted(true);
    } catch (e) {
      console.error("Coding wrong", e);
      dispatch(
        showAlert({
          message: `Coding wrong. (${(e as Error).message})`,
          duration: 8000,
        }),
      );
    }

    // setIsConfirmed(true);
  };

  const confirmHandler = (mnemonics: string[]) => {
    // if (verificationStep === 0) {

    const checkMnemonics = mnemonicsVerifyIdx.map((v, index) => mnemonics[v] === inputs[index].toLowerCase());
    if (!checkMnemonics.every((v) => Boolean(v))) {
      // return;
    }
    setupPinCode(mnemonics);
  }; // , [mnemonics, mnemonicsVerifyIdx, inputs, verificationStep]);

  const description = useMemo(
    () => (
      <p>
        {t("description")} <span>{mnemonicsVerifyIdx.map((v) => v + 1).join(", ")}</span>
      </p>
    ),
    [mnemonics, mnemonicsVerifyIdx, inputs],
  );

  const generateUniqueRandomNumbers = (count: number, min: number, max: number): number[] => {
    const uniqueNumbers = new Set<number>();
    while (uniqueNumbers.size < count) {
      uniqueNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(uniqueNumbers) as number[];
  };

  useEffect(() => {
    const randomIdx = generateUniqueRandomNumbers(3, 0, 23);
    // const randomIdx = Array(3)
    //   .fill(0)
    //   .map(() => randomInt(0, 23));

    setMnemonicsVerifyIdx(randomIdx);
    if (!state || state.mnemonic === null) {
      navigate("/", { replace: true });
      return;
    }

    const mnemonics = state.mnemonic.split(" ");
    if (state) {
      setMnemonics(mnemonics);
    } else {
    }
    page.setLoading(false, false);
    btn.init(t("next", "button"), () => {
      confirmHandler(mnemonics);
    });
    if (!state?.confirm) {
      setIsConfirmed(true);
    }
  }, []);

  useEffect(() => {
    if (isCompleted) {
      btn.init(t("next", "button"), () => {});
      navigate("/registration/completed", { replace: true });
    }
  }, [isCompleted]);

  return (
    <Page title={t("confirm-mnemonics")}>
      {isConfirmed && (
        <>
          {description}
          <Column>
            <div className="container">
              {mnemonicsVerifyIdx.map((number, index) => (
                <label key={index}>
                  <Input prefix={`${number + 1}.`} key={number} onChange={handleChange(index)} />
                </label>
              ))}
            </div>
          </Column>
        </>
      )}
      {!isConfirmed && <div>Next step You need setup pincode for wallet</div>}
    </Page>
  );
};

export default ConfirmKey;
