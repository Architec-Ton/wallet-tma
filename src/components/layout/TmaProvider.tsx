/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from 'react';
import { TmaStateContext, TmaMainButton } from '../../hooks/useTma';
import { isTMA } from '@tma.js/sdk-react';
import MainButton from '../buttons/MainButton';

type Props = {
  children: ReactNode;
};

export function TmaProvider({ children }: Props) {
  const [isTmaLoading, setIsTmaLoading] = useState<boolean>(true);
  const [isTma, setIsTma] = useState<boolean>(true);
  const [mainButton, setMainButton] = useState<TmaMainButton>({
    visible: false,
    title: undefined,
    onClick: () => {},
  });

  useEffect(() => {
    setIsTmaLoading(true);
    isTMA()
      .then((tma) => setIsTma(tma))
      .finally(() => {
        setTimeout(() => {
          console.log('loading false');
          setIsTmaLoading(false);
        }, 2000);
        // setIsTmaLoading(false)
      });
  }, []);

  return (
    <TmaStateContext.Provider value={{ isTmaLoading, isTma, setMainButton }}>
      {children}
      {<MainButton mainButton={mainButton} />}
    </TmaStateContext.Provider>
  );
}
