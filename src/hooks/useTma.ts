import { createContext, useContext, useEffect } from "react";

import { setMainButtonTitle, setMainButtonVisible } from "../features/tma/mainButtonSlice";
import { useAppDispatch } from "./useAppDispatch";

export interface TmaMainButton {
  title?: string;
  visible?: boolean;
  onClick?: () => void;
}

export type EventHandler = () => void;

export const TmaStateContext = createContext<{
  setMainButtonHandler: (p: TmaMainButton) => void;
}>({
  setMainButtonHandler: () => {},
});

export const useTmaState = () => useContext(TmaStateContext);

export function useTmaMainButton() {
  // const { setMainButton } = useTmaState();
  const dispatch = useAppDispatch();
  const { setMainButtonHandler } = useTmaState();

  useEffect(
    () => () => {
      dispatch(setMainButtonVisible(false));
      setMainButtonHandler({
        onClick: undefined,
      });
    },
    [],
  );

  return {
    init: (title: string, onClick: () => void, visible: boolean = true) => {
      setMainButtonHandler({
        onClick,
      });
      dispatch(setMainButtonTitle(title));
      dispatch(setMainButtonVisible(visible));
    },
    refresh: (onClick: () => void) => {
      setMainButtonHandler({
        onClick,
      });
    },
    setVisible: (visible: boolean) => {
      dispatch(setMainButtonVisible(visible));
    },
  };
}
