import { useAppDispatch } from './useAppDispatch';
import {
  setMainButtonTitle,
  setMainButtonVisible,
} from '../features/tma/mainButtonSlice';
import { createContext, useContext } from 'react';

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
  //const { setMainButton } = useTmaState();
  const dispatch = useAppDispatch();
  const { setMainButtonHandler } = useTmaState();

  return {
    init: (title: string, onClick: () => void, visible: boolean = true) => {
      setMainButtonHandler({
        onClick: onClick,
      });
      dispatch(setMainButtonTitle(title));
      dispatch(setMainButtonVisible(visible));

      //console.log('call init', visible);

      //setMainButton({ title: title, onClick: onClick, visible: visible });
    },
  };
}
