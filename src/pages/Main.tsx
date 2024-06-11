import Page from '../components/containers/Page';
import Column from '../components/containers/Column';
import { useEffect } from 'react';
import Balance from '../components/ui/balance/Balance';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setLoading, setTitle } from '../features/page/pageSlice';

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
