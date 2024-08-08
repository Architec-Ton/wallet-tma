import type { ReactNode } from "react";

import "./Layout.styles.css";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return <main>{children}</main>;
}

export default Layout;
