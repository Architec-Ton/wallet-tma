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
}>({
  isLoading: true,
  title: { title: 'Ok' },
  setTitle: () => {},
  setIsLoading: () => {},
});

export const usePageState = () => useContext(PageStateContext);

export function usePage() {
  const { setTitle, setIsLoading } = usePageState();
  return {
    setTitle: setTitle,
    setIsLoading: setIsLoading,
  };
}
