import { useEffect } from 'react';
import Column from '../components/containers/Column';
import Page from '../components/containers/Page';
import Balance from '../components/ui/balance/Balance';
import { useAppDispatch } from '../hooks/useAppDispatch';
import useRouter from '../hooks/useRouter';
import { useTon } from '../hooks/useTon';
import { usePage } from '../hooks/usePage';

function Main() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const ton = useTon();
  const page = usePage();
  useEffect(() => {
    page.setLoading(false);
    page.setTitle('Main', 'Page')
    //page.setLoading(false);


    //  setTimeout(() => {
    //   page.setLoading(false);
    //    navigate('/registration/welcome');
    // }, 2000);

    
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
