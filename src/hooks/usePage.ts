import { createContext, useContext } from 'react';


export interface PageTitle {
  title?: string;
  titleAccent?: string;
  hintMessage?: string;
  description?: string;
}

export const PageStateContext = createContext<{
  isLoading: boolean;
  title: PageTitle;
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isNavbarVisible: boolean;
}>({
  isLoading: true,
  title: { title: 'Ok' },
  isNavbarVisible: true,
  setTitle: () => {},
  setIsLoading: () => {},
  setNavbarVisible: () => {},
});

export const usePageState = () => useContext(PageStateContext);

export function usePage() {
  const { setTitle, setIsLoading , setNavbarVisible} = usePageState();

  return {
    setTitle: setTitle,
    setIsLoading: setIsLoading,
    setNavbarVisible: setNavbarVisible,
  };
}
