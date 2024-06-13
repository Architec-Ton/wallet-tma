import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './useAppDispatch';
import { setLoading, setTitle } from '../features/page/pageSlice';
import { setMainButtonVisible } from '../features/tma/mainButtonSlice';

function useRouter() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navigateFunc = async (url: string) => {
    //dispatch(setTitle({}));
    dispatch(setMainButtonVisible(false));
    dispatch(setLoading(true));
    dispatch(setTitle({}));
    navigate(url);
  };

  return navigateFunc;
}

export default useRouter;
