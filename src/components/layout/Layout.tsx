import { CSSProperties, ReactNode, useState } from 'react';
import './Layout.styles.css';
import { TmaProvider } from './TmaProvider';
import { PageStateContext, PageTitle } from '../../hooks/usePage';
type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

function Layout({ children, style }: Props) {
  const [title, setTitle] = useState<PageTitle>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <PageStateContext.Provider
      value={{ isLoading, title, setTitle, setIsLoading }}>
      <TmaProvider>
        <main style={style}>{children}</main>
      </TmaProvider>
    </PageStateContext.Provider>
  );
}

export default Layout;
