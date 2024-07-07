import { To, useNavigate } from 'react-router-dom';
import { useAppDispatch } from './useAppDispatch';
import { setLoading, setTitle } from '../features/page/pageSlice';
import { setMainButtonVisible } from '../features/tma/mainButtonSlice';

function useRouter() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navigateFunc = async (url: To | number) => {
    //dispatch(setTitle({}));
    dispatch(setMainButtonVisible(false));
    dispatch(setLoading(true));
    dispatch(setTitle({}));
    const nav = async () => {
      if (url == -1) {
        navigate(url as number);
      } else {
        navigate(url as To);
      }
    };
    nav();
  };

  return navigateFunc;
}

export default useRouter;
