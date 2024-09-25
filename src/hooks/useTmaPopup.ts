import { createContext, useContext, useEffect } from "react";

import { MiniAppsEventListener, MiniAppsEventName, OpenPopupOptions } from "@tma.js/sdk-react";
import { setPopupInitData, setPopupIsVisible } from "features/tma/popupSlice";

import { useAppDispatch } from "./useAppDispatch";

export type PopupEventListenerType = <T extends MiniAppsEventName>(config?: {
  listener: MiniAppsEventListener<T>;
}) => void;

export const TmaPopupStateContext = createContext<{
  setPopupEventListener: PopupEventListenerType;
}>({
  setPopupEventListener: () => {},
});

export const useTmaPopupState = () => useContext(TmaPopupStateContext);

export function useTmaPopup() {
  const dispatch = useAppDispatch();
  const { setPopupEventListener } = useTmaPopupState();

  useEffect(
    () => () => {
      dispatch(setPopupIsVisible(false));
      setPopupEventListener(undefined);
    },
    [],
  );

  return {
    init: (initData: OpenPopupOptions, closeHandler: (args: any) => void, visible: boolean = true) => {
      setPopupEventListener({ listener: closeHandler });
      dispatch(setPopupInitData(initData));
      dispatch(setPopupIsVisible(visible));
    },
    setVisible: (visible: boolean) => {
      dispatch(setPopupIsVisible(visible));
    },
  };
}
