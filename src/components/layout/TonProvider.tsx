/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTon } from "../../hooks/useTon";
import { setAddress, TonConnectionMode } from "../../features/ton/tonSlice";

type Props = {
  children: ReactNode;
};

export function TonProvider({ children }: Props) {
  const [tonConnectUI] = useTonConnectUI();
  const dispatch = useAppDispatch();
  const ton = useTon();
  const [bcData] = useLocalStorage("bcData", {
    network: "ton",
    mode: "disconnect",
  });
  useEffect(() => {
    if (bcData.mode == "tonconnect") {
      tonConnectUI.onStatusChange((wallet) => {
        console.log("TonProvider onStatusChange", wallet);
        // console.log("TonProvider connectionRestored:", connectionRestored);
        if (wallet && wallet.account.address) {
          ton.setAddress(
            wallet.account.address,
            "tonconnect",
            wallet.account.publicKey
          );
        } else {
          ton.setDisconnect();
        }
      });
    } else if (bcData.mode == "mnemonics") {
    } else {
      dispatch(
        setAddress({
          mode: TonConnectionMode.disconnect,
        })
      );
    }
  }, []);

  return <>{children}</>;
}
