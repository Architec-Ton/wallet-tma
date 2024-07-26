/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTon } from "../../hooks/useTon";
import { setAddress, TonConnectionMode } from "../../features/ton/tonSlice";
import { setIsTonReady } from "../../features/auth/authSlice";
import { WalletsState } from "../../types/auth";
import usePinCodeModalManagement from "../../hooks/useTon/usePinCodeModal";
import ModalPinCode from "../ui/modals/modalPinCode";
import ModalTrx from "../ui/modals/trxModal";
import useTrxModalManagement from "../../hooks/useTon/useTrxModalManagment";
import { RootState } from "../../store";

type Props = {
  children: ReactNode;
};

export function TonProvider({ children }: Props) {
  const [tonConnectUI] = useTonConnectUI();
  const dispatch = useAppDispatch();
  const ton = useTon();
  const pincode = usePinCodeModalManagement();
  const trx = useTrxModalManagement();
  const trxHash = useAppSelector((state: RootState) => state.trx.trxHash);
  const trxInitData = useAppSelector(
    (state: RootState) => state.trx.trxInitData
  );

  // const tonMode = useAppSelector(selectTonMode);
  const [bcData] = useLocalStorage<WalletsState>("wData", {
    currentWallet: -1,
    wallets: [],
  });
  useEffect(() => {
    console.log(bcData);
    if (bcData.currentWallet < 0) {
      dispatch(
        setAddress({
          mode: TonConnectionMode.disconnect,
        })
      );
      dispatch(setIsTonReady(true));
    } else if (bcData.wallets[bcData.currentWallet].mode == "tonconnect") {
      let resetTonConnect = true;
      tonConnectUI.onStatusChange((wallet) => {
        resetTonConnect = false;
        if (wallet && wallet.account.address) {
          ton.setAddress(
            wallet.account.address,
            "tonconnect",
            wallet.account.publicKey
          );
        } else {
          ton.setDisconnect();
        }
        dispatch(setIsTonReady(true));
      });
      const timer = setTimeout(() => {
        if (resetTonConnect) {
          ton.setDisconnect();
          dispatch(setIsTonReady(true));
        }
      }, 20000);
      return () => clearTimeout(timer);
    } else if (bcData.wallets[bcData.currentWallet].mode == "mnemonics") {
      ton.setAddress(
        bcData.wallets[bcData.currentWallet].address || "",
        "mnemonics",
        bcData.wallets[bcData.currentWallet].publicKey,
        bcData.wallets[bcData.currentWallet].privateKey
      );
      dispatch(setIsTonReady(true));
    }
  }, []);

  return (
    <>
      {children}
      {pincode.isOpened && <ModalPinCode onSuccess={pincode.confirm} />}
      {trx.isOpened && (
        <ModalTrx
          trxHash={trxHash}
          trxInitData={trxInitData}
          // onClose={onClose}
          // commission={state?.commission}
          // returnValue={state?.returnValue}
          // address={state?.address}
          // inProgress={isTransactionInProgress}
        >
          {/* {partialContent} */}
        </ModalTrx>
      )}
    </>
  );
}
