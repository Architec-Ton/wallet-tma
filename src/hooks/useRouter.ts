import type { NavigateOptions, To } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { setLoading, setTitle } from "../features/page/pageSlice";
import { setMainButtonVisible } from "../features/tma/mainButtonSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useTmaState } from "./useTma";

function useRouter() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setMainButtonHandler } = useTmaState();

  const navigateFunc = async (url: To | number, options?: NavigateOptions) => {
    // dispatch(setTitle({}));
    dispatch(setMainButtonVisible(false));
    setMainButtonHandler({
      onClick: undefined,
    });
    dispatch(setLoading(true));
    dispatch(setTitle({}));
    const nav = (url: string | number) => {
      if (url === -1) {
        navigate(url as number);
      } else {
        navigate(url as To, options);
      }
    };
    setTimeout(() => {
      nav(url as string | number);
    }, 100);
  };

  return navigateFunc;
}

export default useRouter;
