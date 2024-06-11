import Page from '../../components/containers/Page.tsx';
import useLanguage from '../../hooks/useLanguage.ts';
import InputList from '../../components/inputs/InputList.tsx'
import React, { useEffect, useState } from 'react';
import './Existing.styles.css';
import PasteButton from '../../components/buttons/PasteButton.tsx';
import { usePage } from '../../hooks/usePage.ts';
import {useTmaMainButton} from "../../hooks/useTma.ts";


const Existing: React.FC = () => {
  const t = useLanguage('Existing');
  const btn = useTmaMainButton();
  const page = usePage();
  const [inputs, setInputs] = useState<string[]>(Array(24).fill(''));
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);


  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    setIsButtonEnabled(newInputs.every(input => input.trim() !== ''))
  }

  const getWords = () => {
    if (isButtonEnabled) {
      console.log(inputs)
    }
  }

  useEffect(() => {

    btn.init(t('get_words'), getWords, isButtonEnabled);
    page.setTitle({
      title: t('enter-key'),
    })

  }, [inputs])

  return (
    <Page>
      <div className="inputListContainer">
        <InputList startNumber={1} count={12} onInputChange={handleInputChange}/>
        <InputList startNumber={13} count={12} onInputChange={handleInputChange}/>
      </div>
      <PasteButton />
    </Page>
  )
}

export default Existing
