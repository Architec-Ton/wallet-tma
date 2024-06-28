/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import { isTMA, useInitDataRaw } from "@tma.js/sdk-react";
import MainButton from "../buttons/MainButton";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { setTma, setTmaLoading } from "../../features/tma/tmaSlice";
import {
  selectMainButtonIsVisible,
  selectMainButtonTitle,
} from "../../features/tma/mainButtonSelector";
import { TmaMainButton, TmaStateContext } from "../../hooks/useTma";
import {
  selectIsTma,
  selectIsTmaLoading,
} from "../../features/tma/tmaSelector";
import {
  AccountState,
  setAccessToken,
  setAccount,
  setUser,
} from "../../features/auth/authSlice";
import { selectAuth } from "../../features/auth/authSelector";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useApiAuthMutation } from "../../features/auth/authApi";
import { AuthInitData } from "../../types/auth";

type Props = {
  children: ReactNode;
};

export function TmaProvider({ children }: Props) {
  const dispatch = useAppDispatch();

  const mainButtonIsVisible = useAppSelector(selectMainButtonIsVisible);
  const mainButtonTitle = useAppSelector(selectMainButtonTitle);
  const isTmaLoading = useAppSelector(selectIsTmaLoading);
  const isTma = useAppSelector(selectIsTma);
  const auth = useAppSelector(selectAuth);
  const [authApi] = useApiAuthMutation();
  const [mainButtonHandler, setMainButtonHandler] = useState<TmaMainButton>({
    onClick: () => {},
  });

  const [authData, setAuthData] = useLocalStorage("auth", {
    accessToken: null,
  });

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

  const handleAuth = async (auth?: AccountState) => {
    try {
      const result = await authApi({
        authType: auth ? "telegram" : "web",
        initDataRaw: auth?.account,
      }).unwrap();
      console.log("Auth result:", result);
      dispatch(setAccessToken(result.access_token));
    } catch (err) {
      console.error("Failed to login: ", err);
    }
  };

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
          handleAuth(auth);
        }
      } else {
        // Add login by web
        handleAuth();
      }
    }
  }, [isTma, isTmaLoading, initDataRaw]);

  useEffect(() => {
    // handleAuth(auth);
    console.log("auth:", auth);
  }, [auth]);

  return (
    <TmaStateContext.Provider value={{ setMainButtonHandler }}>
      {children}
      {
        <MainButton
          title={mainButtonTitle}
          visible={mainButtonIsVisible && !isTmaLoading}
          onClick={mainButtonHandler?.onClick}
        />
      }
    </TmaStateContext.Provider>
  );
}
