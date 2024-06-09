import Page from '../components/containers/Page';
import Column from '../components/containers/Column';
import useLanguage from '../hooks/useLanguage';
import { useEffect } from 'react';
import { usePage } from '../hooks/usePage';
import Balance from '../components/ui/balance/Balance';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  //   const btn = useTmaMainButton();
  const page = usePage();
  const t = useLanguage('Main');

  useEffect(() => {
    // navigate('/registration/welcome');
    // page.setIsLoading(true);
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
