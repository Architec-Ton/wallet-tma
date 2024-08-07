import { useAppDispatch } from "./useAppDispatch";
import {
  setLoading,
  setNavbarVisible,
  setTitle,
} from "../features/page/pageSlice";

export interface PageTitle {
  title?: string;
  titleAccent?: string;
  hintMessage?: string;
  description?: string;
}

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
    setNavbarVisible: (visible: boolean) => dispatch(setNavbarVisible(visible)),
    setLoading: (state: boolean, navbar: boolean = false) => {
      dispatch(setLoading(state));
      dispatch(setNavbarVisible(navbar));
    },
  };
}
