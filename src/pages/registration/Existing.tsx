import Page from '../../components/containers/Page.tsx';
import useLanguage from '../../hooks/useLanguage.ts';
import Input from '../../components/inputs/Input.tsx';
import React, { useEffect } from 'react';
import './Existing.styles.css';
import PasteButton from '../../components/buttons/PasteButton.tsx';
import { usePage } from '../../hooks/usePage.ts';

interface InputListProps {
  startNumber: number;
  count: number;
}

const Existing: React.FC = () => {
  const t = useLanguage('Existing');

  const page = usePage();

  const InputList: React.FC<InputListProps> = ({ startNumber, count }) => {
    const inputs = Array.from({ length: count }, (_, index) => (
      <Input number={startNumber + index} key={startNumber + index} />
    ));
    return <div>{inputs}</div>;
  };

  useEffect(() => {
    page.setTitle({
      title: t('enter-key'),
    });
  });

  return (
    <Page>
      <div className="inputListContainer">
        <InputList startNumber={1} count={12} />
        <InputList startNumber={13} count={12} />
      </div>
      <PasteButton />
    </Page>
  );
};

export default Existing;
