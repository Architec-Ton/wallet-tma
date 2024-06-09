import { createContext, useContext } from 'react';

export interface TmaMainButton {
  title?: string;
  visible: boolean;
  onClick?: () => void;
}

export type EventHandler = () => void;

export interface TmaState {
  isTmaLoading: boolean;
  isTma: boolean;
  mainButton: TmaMainButton;
}

export const TmaStateContext = createContext<{
  isTmaLoading: boolean;
  isTma: boolean;
  setMainButton: (btn: TmaMainButton) => void;
}>({
  isTmaLoading: true,
  isTma: true,
  setMainButton: () => {},
});

export const useTmaState = () => useContext(TmaStateContext);

export function useTmaMainButton() {
  const { setMainButton } = useTmaState();
  return {
    init: (title: string, onClick: () => void, visible: boolean) => {
      setMainButton({ title: title, onClick: onClick, visible: visible });
    },
  };
}
