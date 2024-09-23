import React, { useEffect } from "react";
import type { ReactNode } from "react";

import { setIsAppWasReloaded } from "features/tma/backButtonSlice";

import { useAppDispatch } from "hooks/useAppDispatch";

import "./Layout.styles.css";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.location.pathname !== "/wallet") {
      dispatch(setIsAppWasReloaded(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <main>{children}</main>;
}

export default Layout;
