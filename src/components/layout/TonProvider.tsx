/* eslint-disable react-hooks/exhaustive-deps */
import type { ReactNode } from "react";
import React, { useEffect } from "react";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { setIsTonReady } from "features/auth/authSlice";
import { TonConnectionMode, setAddress } from "features/ton/tonSlice";
import type { WalletsState } from "types/auth";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useLocalStorage from "hooks/useLocalStorage";
import { useTon } from "hooks/useTon";
import usePinCodeModalManagement from "hooks/useTon/usePinCodeModal";
import useTrxModalManagement from "hooks/useTon/useTrxModalManagment";

import type { RootState } from "../../store";
import ModalPinCode from "../ui/modals/modalPinCode";
import ModalTrx from "../ui/modals/trxModal";

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
  const trxInitData = useAppSelector((state: RootState) => state.trx.trxInitData);

  const [bcData] = useLocalStorage<WalletsState>("wData", {
    currentWallet: -1,
    wallets: [],
  });
  useEffect(() => {
    if (bcData.currentWallet < 0) {
      dispatch(
        setAddress({
          mode: TonConnectionMode.disconnect,
        }),
      );
      dispatch(setIsTonReady(true));
    } else if (bcData.wallets[bcData.currentWallet].mode === TonConnectionMode.tonconnect) {
      let resetTonConnect = true;
      if (tonConnectUI.account && tonConnectUI.account.address) {
        ton.setAddress(tonConnectUI.account.address, TonConnectionMode.tonconnect, tonConnectUI.account.publicKey);
      } else {
        tonConnectUI.onStatusChange((wallet) => {
          resetTonConnect = false;
          if (wallet && wallet.account.address) {
            ton.setAddress(wallet.account.address, TonConnectionMode.tonconnect, wallet.account.publicKey);
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
      }
    } else if (bcData.wallets[bcData.currentWallet].mode === TonConnectionMode.mnemonics) {
      ton.setAddress(
        bcData.wallets[bcData.currentWallet].address || "",
        TonConnectionMode.mnemonics,
        bcData.wallets[bcData.currentWallet].publicKey,
        bcData.wallets[bcData.currentWallet].privateKey,
      );
      dispatch(setIsTonReady(true));
    }
  }, [bcData, tonConnectUI]);

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
