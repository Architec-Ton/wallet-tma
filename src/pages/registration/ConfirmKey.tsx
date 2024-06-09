import Page from '../../components/containers/Page.tsx';
import useLanguage from '../../hooks/useLanguage.ts';
import Column from '../../components/containers/Column.tsx';
import './ConfirmKey.styles.css';
import Input from '../../components/inputs/Input.tsx';
import React, { useEffect } from 'react';
import { usePage } from '../../hooks/usePage.ts';

const ConfirmKey: React.FC = () => {
  const t = useLanguage('Confirm');
  const page = usePage();

  const numbersOfWords = [1, 2, 3];

  //const description = (<p>{t('description')} <span>{numbersOfWords.join(', ')}</span></p>)

  useEffect(() => {
    page.setTitle({
      title: t('confirm-the-key'),
      description: t('description'),
    });
  });

  return (
    <Page>
      <Column>
        <div className="container">
          {numbersOfWords.map((number, index) => (
            <Input number={number} key={index} />
          ))}
        </div>
      </Column>
    </Page>
  );
};

export default ConfirmKey;
