import { createContext, useContext } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { setLoading, setTitle } from "../features/page/pageSlice";

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
  title: { title: "Ok" },
  setTitle: () => {},
  setIsLoading: () => {},
});

export const usePageState = () => useContext(PageStateContext);

export function usePage() {
  const dispatch = useAppDispatch();
  return {
    setTitle: (title?: string, titleAccent?: string, hintMessage?: string) =>
      dispatch(
        setTitle({
          title: title,
          titleAccent: titleAccent,
          hintMessage: hintMessage,
        })
      ),
    setLoading: (state: boolean) => dispatch(setLoading(state)),
  };
}
