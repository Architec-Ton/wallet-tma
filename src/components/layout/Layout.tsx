import { CSSProperties, ReactNode } from 'react';
import './Layout.styles.css';
type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

function Layout({ children, style }: Props) {
  return (
    <>
      <main style={style}>{children}</main>
    </>
  );
}

export default Layout;
