import { useCallback } from "react";
import type { NavigateOptions, To } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { setMainButtonVisible } from "../features/tma/mainButtonSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useTmaState } from "./useTma";

function useRouter() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setMainButtonHandler } = useTmaState();

  const navigateFunc = useCallback(
    async (url: To | number, options?: NavigateOptions) => {
      dispatch(setMainButtonVisible(false));

      setMainButtonHandler({
        onClick: undefined,
      });

      const nav = (navUrl: string | number) => {
        if (navUrl === -1) {
          navigate(navUrl as number);
        } else {
          navigate(navUrl as To, options);
        }
      };

      setTimeout(() => {
        nav(url as string | number);
      }, 100);
    },
    [navigate, dispatch, setMainButtonHandler],
  );

  return navigateFunc;
}

export default useRouter;
