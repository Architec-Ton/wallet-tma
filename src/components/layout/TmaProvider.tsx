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

type Props = {
  children: ReactNode;
};

export function TmaProvider({ children }: Props) {
  const dispatch = useAppDispatch();

  const mainButtonIsVisible = useAppSelector(selectMainButtonIsVisible);
  const mainButtonTitle = useAppSelector(selectMainButtonTitle);
  const isTmaLoading = useAppSelector(selectIsTmaLoading);
  const isTma = useAppSelector(selectIsTma);
  const [mainButtonHandler, setMainButtonHandler] = useState<TmaMainButton>({
    onClick: () => {},
  });

  //const launchParams = useLaunchParams()

  const initDataRaw = useInitDataRaw();

  useEffect(() => {
    dispatch(setTmaLoading(true));
    isTMA()
      .then((tma) => dispatch(setTma(tma)))
      .finally(() => {
        dispatch(setTmaLoading(false));
        // console.log("setTmaLoading", false);
        // setTimeout(() => {
        //   dispatch(setTmaLoading(false));
        // }, 2000);
      });
  }, []);

  useEffect(() => {
    if (isTma) {
      console.log("isTMA;", isTma);
      console.log("init result:", initDataRaw.result);
      console.log(JSON.stringify(initDataRaw.result));
      console.log("initDataRaw :", initDataRaw);
      console.log(initDataRaw.error);
      //console.log(launchParams.initDataRaw)
    } else {
      console.log("isTMA;", isTma);
    }
  }, [isTma, initDataRaw]);

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
