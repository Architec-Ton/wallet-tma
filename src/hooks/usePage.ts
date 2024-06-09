import { createContext, useContext } from 'react';

export interface PageTitle {
  title?: string;
  titleAccent?: string;
  hintMessage?: string;
}

export const PageStateContext = createContext<{
  title: PageTitle;
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>; //(title: PageTitle) => void;
}>({
  title: { title: 'aaaaaa' },
  setTitle: () => {},
});

export const usePageState = () => useContext(PageStateContext);

export function usePage() {
  const { setTitle } = usePageState();
  return {
    setTitle: setTitle,
  };
}
