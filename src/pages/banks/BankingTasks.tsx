import { useEffect } from 'react';
import Column from '../../components/containers/Column';
import Page from '../../components/containers/Page';
import useLanguage from '../../hooks/useLanguage';
import { usePage } from '../../hooks/usePage';
import BlockWithTitle from '../../components/typography/BlockWithTitle';

function BankingTasks() {
  const page = usePage();

  const t = useLanguage('banking-tasks');

  useEffect(() => {
    page.setLoading(false);
  }, []);

  return (
    <Page title={t('title')}>
      <Column columns={2}>
        <BlockWithTitle title={t('partners')}>.</BlockWithTitle>
      </Column>
      <p className="small">{t('comment')}</p>
    </Page>
  );
}

export default BankingTasks;
