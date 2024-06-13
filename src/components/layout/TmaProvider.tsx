/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from 'react';
import { isTMA } from '@tma.js/sdk-react';
import MainButton from '../buttons/MainButton';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { setTma, setTmaLoading } from '../../features/tma/tmaSlice';
import {
  selectMainButtonIsVisible,
  selectMainButtonTitle,
} from '../../features/tma/mainButtonSelector';
import { TmaMainButton, TmaStateContext } from '../../hooks/useTma';
import { selectIsTmaLoading } from '../../features/tma/tmaSelector';

type Props = {
  children: ReactNode;
};

export function TmaProvider({ children }: Props) {
  const dispatch = useAppDispatch();

  const mainButtonIsVisible = useAppSelector(selectMainButtonIsVisible);
  const mainButtonTitle = useAppSelector(selectMainButtonTitle);
  const isTmaLoading = useAppSelector(selectIsTmaLoading);
  const [mainButtonHandler, setMainButtonHandler] = useState<TmaMainButton>({
    onClick: () => {},
  });

  useEffect(() => {
    dispatch(setTmaLoading(true));
    isTMA()
      .then((tma) => dispatch(setTma(tma)))
      .finally(() => {
        dispatch(setTmaLoading(false));
        // setTimeout(() => {
        //   dispatch(setTmaLoading(false));
        // }, 2000);
      });
  }, []);
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
