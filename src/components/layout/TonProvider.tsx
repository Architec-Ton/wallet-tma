/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";

type Props = {
  children: ReactNode;
};

export function TonProvider({ children }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return <>{children}</>;
}
