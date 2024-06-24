import { useEffect } from 'react';
import Column from '../components/containers/Column';
import Page from '../components/containers/Page';
import Balance from '../components/ui/balance/Balance';
import { setLoading, setTitle } from '../features/page/pageSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import useRouter from '../hooks/useRouter';

function Main() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setTitle({ title: 'Main', titleAccent: 'Page' }));

    setTimeout(() => {
      dispatch(setLoading(false));
      navigate('/registration/welcome');
    }, 2000);

    
  }, []);

  return (
    <Page>
      <Column>
        <Balance></Balance>
      </Column>
    </Page>
  );
}

export default Main;
