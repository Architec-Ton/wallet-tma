import { useEffect, useState } from "react";

import { Address } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";

import { TonConnectionMode, setAddress, setSeqno } from "../../features/ton/tonSlice";
import { WalletsState } from "../../types/auth";
import { useAppDispatch } from "../useAppDispatch";
import useLocalStorage from "../useLocalStorage";
import { useSender } from "./sender";
import { useWalletInitData } from "./useWalletInitData";

export function useTon() {
  const dispatch = useAppDispatch();
  const wallet = useWalletInitData();
  const [tonConnectUI] = useTonConnectUI();
  const [bcData, setBcData] = useLocalStorage<WalletsState>("wData", {
    currentWallet: -1,
    wallets: [],
  });

  const sender = useSender();

  const [tonMode, setTonMode] = useState<TonConnectionMode>(TonConnectionMode.disconnect);

  useEffect(() => {
    if (bcData.currentWallet < 0) {
      setTonMode(TonConnectionMode.disconnect);
    } else {
      setTonMode(bcData.wallets[bcData.currentWallet].mode);
    }
  }, []);

  return {
    mode: tonMode,
    wallet: wallet,
    sender: sender,
    setSeqno: (seqno: number | null) => dispatch(setSeqno(seqno)),
    setAddress: (address: string, mode: TonConnectionMode, publicKey?: string, privateKey?: string) => {
      setTonMode(mode);

      dispatch(
        setAddress({
          address: address
            ? Address.parse(address).toString({
                urlSafe: true,
                bounceable: false,
              })
            : undefined,
          mode,
          publicKey: publicKey,
          privateKey: privateKey,
        }),
      );

      console.log("useTon.setAddress", mode, address, publicKey);
    },
    setDisconnect: () => {
      setBcData({
        currentWallet: -1,
        wallets: [],
        // network: 'ton',
        // mode: 'disconnect',
      });
      if (tonConnectUI) tonConnectUI.disconnect();
      if (localStorage) localStorage.removeItem("ton-connect-storage_bridge-connection");
      setTonMode(TonConnectionMode.disconnect);
      dispatch(
        setAddress({
          mode: TonConnectionMode.disconnect,
        }),
      );
    },
  };
}
