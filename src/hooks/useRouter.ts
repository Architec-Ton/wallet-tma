import { NavigateOptions, To, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./useAppDispatch";
import { setLoading, setTitle } from "../features/page/pageSlice";
import { setMainButtonVisible } from "../features/tma/mainButtonSlice";
import { useTmaState } from "./useTma";

function useRouter() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setMainButtonHandler } = useTmaState();
  const navigateFunc = async (url: To | number, options?: NavigateOptions) => {
    //dispatch(setTitle({}));
    dispatch(setMainButtonVisible(false));
    setMainButtonHandler({
      onClick: () => {},
    });
    dispatch(setLoading(true));
    dispatch(setTitle({}));
    const nav = (url: string | number) => {
      if (url == -1) {
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
