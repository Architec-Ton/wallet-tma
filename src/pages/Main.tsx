import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Column from '../components/containers/Column';
import Page from '../components/containers/Page';
import Balance from '../components/ui/balance/Balance';
import { setLoading, setTitle } from '../features/page/pageSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

function Main() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setTitle({ title: 'Main', titleAccent: 'Page' }));

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);

    navigate('/registration/welcome');
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
