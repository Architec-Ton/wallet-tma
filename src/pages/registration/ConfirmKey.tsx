import Page from '../../components/containers/Page.tsx';
import useLanguage from '../../hooks/useLanguage.ts';
import Column from '../../components/containers/Column.tsx';
import './ConfirmKey.styles.css';
import Input from '../../components/inputs/Input.tsx';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTmaMainButton } from '../../hooks/useTma.ts';
// import { usePage } from '../../hooks/usePage.ts';

const ConfirmKey: React.FC = () => {
  const t = useLanguage('Confirm');
  const navigate = useNavigate();
  const btn = useTmaMainButton();
  // const page = usePage();
  const numbersOfWords = [1, 2, 3];

  const description = (
    <p>
      {t('description')} <span>{numbersOfWords.join(', ')}</span>
    </p>
  );
  useEffect(() => {
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
          {numbersOfWords.map((number, index) => (
            <Input prefix={`${index + 1}.`} key={index} />
          ))}
        </div>
      </Column>
    </Page>
  );
};

export default ConfirmKey;
