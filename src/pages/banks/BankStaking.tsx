import { useEffect } from 'react';
import Column from '../../components/containers/Column';
import Page from '../../components/containers/Page';
import useLanguage from '../../hooks/useLanguage';
// import useRouter from '../../hooks/useRouter';
import { useTmaMainButton } from '../../hooks/useTma';
import { usePage } from '../../hooks/usePage';
import BankStakingInfo from '../../components/ui/bank/BankStakingInfo';

function BankStaking() {
  //   const navigate = useRouter();
  const page = usePage();
  const btn = useTmaMainButton();

  const t = useLanguage('bank-stake');

  useEffect(() => {
    page.setLoading(false);
    btn.init(
      t('stake', 'button'),
      () => {
        //   navigate('/registration/add-wallet');
      },
      true
    );
  }, []);

  return (
    <Page title={t('title')}>
      <Column>
        <BankStakingInfo />
      </Column>
    </Page>
  );
}

export default BankStaking;
