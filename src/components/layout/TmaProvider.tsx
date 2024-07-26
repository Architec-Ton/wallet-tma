/* eslint-disable react-hooks/exhaustive-deps */
import { isTMA, useInitDataRaw } from "@tma.js/sdk-react";
import { ReactNode, useEffect, useState } from "react";
import { useApiAuthMutation } from "../../features/auth/authApi";
import {
  selectAuth,
  selectAuthIsTmaReady,
  selectAuthIsTonReady,
} from "../../features/auth/authSelector";
import {
  AccountState,
  setAccessToken,
  setAccount,
  setIsTmaReady,
} from "../../features/auth/authSlice";
import {
  selectMainButtonIsVisible,
  selectMainButtonTitle,
} from "../../features/tma/mainButtonSelector";
import {
  selectIsTma,
  selectIsTmaLoading,
} from "../../features/tma/tmaSelector";
import { setTma, setTmaLoading } from "../../features/tma/tmaSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { TmaMainButton, TmaStateContext } from "../../hooks/useTma";
import { useTon } from "../../hooks/useTon";
import { AuthInitData, AuthInitTon } from "../../types/auth";
import MainButton from "../buttons/MainButton";
import usePinCodeModalManagement from "../../hooks/useTon/usePinCodeModal";

type Props = {
  children: ReactNode;
};

export function TmaProvider({ children }: Props) {
  const dispatch = useAppDispatch();

  const mainButtonIsVisible = useAppSelector(selectMainButtonIsVisible);
  // const [swipeBehavior] = initSwipeBehavior()
  const mainButtonTitle = useAppSelector(selectMainButtonTitle);
  const isTmaLoading = useAppSelector(selectIsTmaLoading);
  const isTma = useAppSelector(selectIsTma);
  const ton = useTon();
  const pincode = usePinCodeModalManagement();
  const auth = useAppSelector(selectAuth);
  const [authApi] = useApiAuthMutation();
  const [mainButtonHandler, setMainButtonHandler] = useState<TmaMainButton>({
    onClick: () => {},
  });

  const isTmaReady = useAppSelector(selectAuthIsTmaReady);
  const isTonReady = useAppSelector(selectAuthIsTonReady);

  //const launchParams = useLaunchParams()

  const initDataRaw = useInitDataRaw();

  useEffect(() => {
    dispatch(setTmaLoading(true));
    isTMA()
      .then((tma) => dispatch(setTma(tma)))
      .finally(() => {
        console.log("setTmaLoading", isTmaLoading);
        dispatch(setTmaLoading(false));
        console.log("setTmaLoading", isTmaLoading);
        console.log("setTmaLoisTmaading isTma", isTma);
        // setTimeout(() => {
        //   dispatch(setTmaLoading(false));
        // }, 2000);
      });
  }, []);

  const handleAuth = async (auth?: AccountState, initTon?: AuthInitTon) => {
    try {
      const result = await authApi({
        authType: auth ? "telegram" : "web",
        initDataRaw: auth?.account,
        initTon: initTon,
      }).unwrap();
      console.log("Auth result:", result);
      dispatch(setAccessToken(result.access_token));
    } catch (err) {
      console.error("Failed to login: ", err);
    }
  };

  useEffect(() => {
    if (isTma) {
      // swipeBehavior.disableVerticalSwipe()
    }
  }, [isTma]);

  useEffect(() => {
    if (!isTmaLoading) {
      if (isTma) {
        if (initDataRaw && initDataRaw.result && initDataRaw.result.user) {
          const u = initDataRaw.result.user;
          const userData = {
            allowsWriteToPm: u.allowsWriteToPm,
            firstName: u.firstName,
            id: u.id,
            isPremium: u.isPremium,
            languageCode: u.languageCode,
            lastName: u.lastName,
            username: u.username,
          };
          const accountData = {
            authDate: initDataRaw.result.authDate.toISOString(),
            hash: initDataRaw.result.hash,
            queryId: initDataRaw.result.queryId,
            user: userData,
          } as AuthInitData;
          // const initTon = ton.wallet
          //   ? ({
          //       network: ton.wallet.network,
          //       address: ton.wallet.address?.toString(),
          //       //publicKey: ton.wall
          //     } as AuthInitTon)
          //   : undefined;
          dispatch(setAccount(accountData));

          //handleAuth(auth, initTon);
        }
      } else {
        // Add login by web
        // const initTon = ton.wallet
        //   ? ({
        //       network: ton.wallet.network,
        //       address: ton.wallet.address?.toString(),
        //       //publicKey: ton.wall
        //     } as AuthInitTon)
        //   : undefined;
        // handleAuth(undefined, initTon);
      }
      dispatch(setIsTmaReady(true));
    }
  }, [isTma, isTmaLoading, initDataRaw]);

  useEffect(() => {
    if (isTmaReady && isTonReady && ton.wallet?.address) {
      console.log("final auth request:", auth);
      const initTon = ton.wallet
        ? ({
            network: ton.wallet.network,
            address: ton.wallet.address?.toString(),
            publicKey: ton.wallet.publicKey,
          } as AuthInitTon)
        : undefined;
      handleAuth(auth, initTon);
    }
  }, [isTmaReady, isTonReady, ton.wallet]);

  return (
    <TmaStateContext.Provider value={{ setMainButtonHandler }}>
      {children}
      {
        <MainButton
          title={mainButtonTitle}
          visible={mainButtonIsVisible && !isTmaLoading && !pincode.isOpened}
          onClick={mainButtonHandler?.onClick}
        />
      }
    </TmaStateContext.Provider>
  );
}
