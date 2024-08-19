/* eslint-disable react-hooks/exhaustive-deps */
import type { ReactNode } from "react";
import React, { useEffect, useMemo, useState } from "react";

import { isTMA, useInitDataRaw } from "@tma.js/sdk-react";
import { useApiAuthMutation } from "features/auth/authApi";
import { selectAccessToken, selectAuth, selectAuthIsTmaReady, selectAuthIsTonReady } from "features/auth/authSelector";
import type { AccountState } from "features/auth/authSlice";
import { setAccessToken, setAccount, setIsReady, setIsTmaReady } from "features/auth/authSlice";
import { selectMainButtonIsVisible, selectMainButtonTitle } from "features/tma/mainButtonSelector";
import { selectIsTma, selectIsTmaLoading } from "features/tma/tmaSelector";
import { setTma, setTmaLoading } from "features/tma/tmaSlice";
import type { AuthInitData, AuthInitTon } from "types/auth";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import type { TmaMainButton } from "hooks/useTma";
import { TmaStateContext } from "hooks/useTma";
import { useTon } from "hooks/useTon";
import usePinCodeModalManagement from "hooks/useTon/usePinCodeModal";
import { useTonClient } from "hooks/useTonClient";

import MainButton from "../buttons/MainButton";

interface TmaProviderProps {
  children: ReactNode;
}

export function TmaProvider({ children }: TmaProviderProps) {
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
    onClick: undefined,
  });
  const { client } = useTonClient();

  const isTmaReady = useAppSelector(selectAuthIsTmaReady);
  const isTonReady = useAppSelector(selectAuthIsTonReady);
  const accessToken = useAppSelector(selectAccessToken);

  const initDataRaw = useInitDataRaw();

  useEffect(() => {
    dispatch(setTmaLoading(true));
    isTMA()
      .then((tma) => dispatch(setTma(tma)))
      .finally(() => {
        dispatch(setTmaLoading(false));
      });
  }, []);

  const handleAuth = async (auth?: AccountState, initTon?: AuthInitTon) => {
    try {
      const result = await authApi({
        authType: auth ? "telegram" : "web",
        initDataRaw: auth?.account,
        initTon,
      }).unwrap();

      dispatch(setAccessToken(result.access_token));
    } catch (err) {
      console.error("Failed to login: ", err);
    }
  };

  useEffect(() => {
    dispatch(setIsReady(isTonReady && isTmaReady && !!accessToken && !!client));
  }, [isTonReady, isTmaReady, accessToken, client]);

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

          dispatch(setAccount(accountData));
        }
      }
      dispatch(setIsTmaReady(true));
    }
  }, [isTma, isTmaLoading, initDataRaw]);

  useEffect(() => {
    if (isTmaReady && isTonReady && ton.wallet?.address) {
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

  const tmaContextValue = useMemo(() => ({ setMainButtonHandler }), [setMainButtonHandler]);

  return (
    <TmaStateContext.Provider value={tmaContextValue}>
      {children}

      <MainButton
        title={mainButtonTitle}
        visible={mainButtonIsVisible && !isTmaLoading && !pincode.isOpened}
        onClick={mainButtonHandler?.onClick}
      />
    </TmaStateContext.Provider>
  );
}
