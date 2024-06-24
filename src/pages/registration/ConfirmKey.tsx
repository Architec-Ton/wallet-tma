import React, { useEffect } from 'react';
import Column from '../../components/containers/Column.tsx';
import Page from '../../components/containers/Page.tsx';
import Input from '../../components/inputs/Input.tsx';
import useLanguage from '../../hooks/useLanguage.ts';
import { useTmaMainButton } from '../../hooks/useTma.ts';
import './ConfirmKey.styles.css';
import { usePage } from '../../hooks/usePage.ts';
import useRouter from '../../hooks/useRouter.ts';
// import { usePage } from '../../hooks/usePage.ts';

const ConfirmKey: React.FC = () => {
  const t = useLanguage('Confirm');
  const navigate = useRouter();
  const btn = useTmaMainButton();
  const page = usePage();
  const numbersOfWords = [1, 2, 3];

  const description = (
    <p>
      {t('description')} <span>{numbersOfWords.join(', ')}</span>
    </p>
  );
  useEffect(() => {
    page.setLoading(false)
    btn.init(
      t('next', 'button'),
      () => navigate('/registration/completed'),
      true
    );
  }, []);

  return (
    <Page title={t('confirm-mnemonics')}>
      {description}
      <Column>
        <div className="container">
          {numbersOfWords.map((number) => (
            <Input prefix={`${number + 1}.`} key={number} />
          ))}
        </div>
      </Column>
    </Page>
  );
};

export default ConfirmKey;
