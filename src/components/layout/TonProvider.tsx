/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTon } from "../../hooks/useTon";
import { setAddress, TonConnectionMode } from "../../features/ton/tonSlice";
import { setIsTonReady } from "../../features/auth/authSlice";
// import { selectTonMode } from "../../features/ton/tonSelector";

type Props = {
  children: ReactNode;
};

export function TonProvider({ children }: Props) {
  const [tonConnectUI] = useTonConnectUI();
  const dispatch = useAppDispatch();
  const ton = useTon();

  // const tonMode = useAppSelector(selectTonMode);
  const [bcData] = useLocalStorage("bcData", {
    network: "ton",
    mode: "disconnect",
  });
  useEffect(() => {
    console.log(bcData);
    if (bcData.mode == "tonconnect") {
      var resetTonConnect = true;
      tonConnectUI.onStatusChange((wallet) => {
        // console.log("TonProvider onStatusChange", wallet);
        // console.log("TonProvider connectionRestored:", connectionRestored);
        resetTonConnect = false;
        if (wallet && wallet.account.address) {
          // console.log("setAddress onStatusChange", wallet);
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
        // console.log("still tonconnect", ton.mode, tonMode, resetTonConnect);
        if (resetTonConnect) {
          // console.log(resetTonConnect);
          ton.setDisconnect();
          dispatch(setIsTonReady(true));
        }
      }, 20000);
      return () => clearTimeout(timer);
    } else if (bcData.mode == "mnemonics") {
    } else {
      dispatch(
        setAddress({
          mode: TonConnectionMode.disconnect,
        })
      );
      dispatch(setIsTonReady(true));
    }
  }, []);

  return <>{children}</>;
}
