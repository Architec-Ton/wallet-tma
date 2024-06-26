import { useAppDispatch } from "../useAppDispatch";
import useLocalStorage from "../useLocalStorage";
import { setAddress, TonConnectionMode } from "../../features/ton/tonSlice";
import { useEffect, useState } from "react";
import { get_wallet } from "./wallet";

export function useTon() {
  const dispatch = useAppDispatch();
  const [bcData, setBcData] = useLocalStorage("bcData", {
    network: "ton",
    mode: "disconnect",
  });

  const [tonMode, setTonMode] = useState<
    "disconnect" | "tonconnect" | "mnemonics"
  >("disconnect");

  useEffect(() => {
    setTonMode(bcData.mode as "disconnect" | "tonconnect" | "mnemonics");
  }, []);

  return {
    mode: tonMode,
    wallet: get_wallet(),
    setAddress: (
      address: string,
      mode: "disconnect" | "tonconnect" | "mnemonics",
      publicKey?: string
    ) => {
      setBcData({ network: "ton", mode: mode });
      setTonMode(mode);
      dispatch(
        setAddress({
          address: address,
          mode:
            mode == "tonconnect"
              ? TonConnectionMode.tonconnect
              : mode == "mnemonics"
              ? TonConnectionMode.mnemonics
              : TonConnectionMode.disconnect,
          publicKey: publicKey,
        })
      );
      console.log("useTon.setAddress", mode, address);
    },
    setDisconnect: () => {
      setBcData({
        network: "ton",
        mode: "disconnect",
      });
      setTonMode("disconnect");
      dispatch(
        setAddress({
          mode: TonConnectionMode.disconnect,
        })
      );
    },
  };
}
