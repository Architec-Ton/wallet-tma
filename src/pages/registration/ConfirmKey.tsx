import React, { useEffect, useMemo, useState } from "react";
import Column from "../../components/containers/Column.tsx";
import Page from "../../components/containers/Page.tsx";
import Input from "../../components/inputs/Input.tsx";
import useLanguage from "../../hooks/useLanguage.ts";
import "./ConfirmKey.styles.css";
import { usePage } from "../../hooks/usePage.ts";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { useTmaMainButton } from "../../hooks/useTma.ts";
import { useLocation } from "react-router-dom";
import { useTon } from "../../hooks/useTon/index.ts";
import { WalletContractV4 } from "@ton/ton";
import usePinCodeModalManagement from "../../hooks/useTon/usePinCodeModal.ts";
import { encodePrivateKeyByPin } from "../../utils/pincode.ts";
import useLocalStorage from "../../hooks/useLocalStorage.ts";
import { WalletsState } from "../../types/auth.ts";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { showAlert } from "../../features/alert/alertSlice.ts";
import useRouter from "../../hooks/useRouter.ts";

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
  const [mnemonicsVerifyIdx, setMnemonicsVerifyIdx] = useState<number[]>([
    3, 7, 17,
  ]);

  const [storedValue, setStoredValue] = useLocalStorage<WalletsState>("wData", {
    currentWallet: -1,
    wallets: [],
  });

  console.log("storedValue", storedValue);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const pincode = usePinCodeModalManagement();

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
      console.log("Something wrong");
      dispatch(
        showAlert({
          message: "Pincode wrong.",
          duration: 8000,
        })
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
        })
      );
      navigate("/");
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
      setIsCompleted(true);
    } catch (e) {
      console.log("Coding wrong", e);
      dispatch(
        showAlert({
          message: `Coding wrong. (${(e as Error).message})`,
          duration: 8000,
        })
      );
    }

    //setIsConfirmed(true);
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

  const generateUniqueRandomNumbers = (
    count: number,
    min: number,
    max: number
  ): number[] => {
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
    console.log("rand:", randomIdx);
    setMnemonicsVerifyIdx(randomIdx);
    if (!state || state.mnemonic === null) {
      navigate("/", { replace: true });
      return;
    }

    const mnemonics = state.mnemonic.split(" ");
    if (state) {
      console.log("state", state.mnemonic.split(" "));
      setMnemonics(mnemonics);
    } else {
      console.log("no state", state);
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
                  <Input
                    prefix={`${number + 1}.`}
                    key={number}
                    onChange={handleChange(index)}
                  />
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
