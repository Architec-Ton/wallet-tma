import { useAppDispatch } from "../useAppDispatch";
import {
  setMainButtonTitle,
  setMainButtonVisible,
} from "../../features/tma/mainButtonSlice";
import {
  useIsConnectionRestored,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useEffect } from "react";
// import { createContext, useContext } from 'react';

// export interface TmaMainButton {
//   title?: string;
//   visible?: boolean;
//   onClick?: () => void;
// }

// export type EventHandler = () => void;

// export const TmaStateContext = createContext<{
//   setMainButtonHandler: (p: TmaMainButton) => void;
// }>({
//   setMainButtonHandler: () => {},
// });

// export const useTmaState = () => useContext(TmaStateContext);

export async function tonConnect() {
  const [tonConnectUI] = useTonConnectUI();
  const connectionRestored = useIsConnectionRestored();
  useEffect(
    () =>
      tonConnectUI.onStatusChange((wallet) => {
        console.log("onStatusChange", wallet);
        console.log("connectionRestored:", connectionRestored);
        // if (
        //   wallet.connectItems?.tonProof &&
        //   "proof" in wallet.connectItems.tonProof
        // ) {
        //   checkProofInYourBackend(
        //     wallet.connectItems.tonProof.proof,
        //     wallet.account
        //   );
        // }
      }),
    []
  );
  // const { state, open, close } = useTonConnectModal();
}
