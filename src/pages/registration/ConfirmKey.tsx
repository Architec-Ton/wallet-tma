import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import Column from '../../components/containers/Column.tsx';
import Page from '../../components/containers/Page.tsx';
import Input from '../../components/inputs/Input.tsx';
import useLanguage from '../../hooks/useLanguage.ts';
import './ConfirmKey.styles.css';
import {usePage} from '../../hooks/usePage.ts';
import useRouter from '../../hooks/useRouter.ts';
import ModalPinCode from "../../components/ui/modals/modalPinCode";
import useLocalStorage from "../../hooks/useLocalStorage.ts";
// import { usePage } from '../../hooks/usePage.ts';
import CryptoES from 'crypto-es';
import {sha256_sync} from "@ton/crypto";

function threeRandomIndexes() {
  const array = new Array(24).fill(0).map((_, i) => i + 1);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.slice(0, 3);
}

const encodeMnemonic = (mnemonic: string, pinCode: string, uuid: string = '') => {
  return CryptoES.TripleDES.encrypt(mnemonic, sha256_sync(pinCode + uuid).toString()).ciphertext!.toString()
}

const ConfirmKey: React.FC = () => {
  const t = useLanguage('Confirm');
  const navigate = useRouter();
  const page = usePage();

  const [mnemonic, setMnemonic] = useLocalStorage<string>("mnemonic", '');
  const splitMnemonic = mnemonic.split(' ');

  const numbersOfWords = useRef(threeRandomIndexes())
  const [firstWord, setFirstWorld] = useState('');
  const [secondWord, setSecondWorld] = useState('');
  const [thirdWord, setThirdWorld] = useState('');
  const setsWord = [setFirstWorld, setSecondWorld, setThirdWorld]

  const [showPinCode, setShowPinCode] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<string>('');

  const handleChange = (setter: React.Dispatch<React.SetStateAction<typeof firstWord>>) => {
    return (event: ChangeEvent<HTMLInputElement>) => setter(event.target.value)
  }

  const onPinSuccess = () => {
    setShowPinCode(false);
    // TODO взять uuid
    const code = encodeMnemonic(mnemonic, pinCode)
    setMnemonic(code)
    navigate('/registration/completed')
  };

  const confirmHandler = () => {
    if (splitMnemonic[numbersOfWords.current[0] - 1] === firstWord &&
        splitMnemonic[numbersOfWords.current[1] - 1] === secondWord &&
        splitMnemonic[numbersOfWords.current[2] - 1] === thirdWord
    ) {
      setShowPinCode(true);
    } else {
      // TODO notification
      navigate('/registration/secret-key')
    }
  };

  const description = (
    <p>
      {t('description')} <span>{numbersOfWords.current.join(', ')}</span>
    </p>
  );

  useEffect(() => {
    page.setLoading(false);
  }, []);

  return (
    <Page title={t('confirm-mnemonics')}>
      {description}
      <Column>
        <div className="container">
          {numbersOfWords.current.map((number, index) => (
              <label key={number}>
                <Input prefix={`${number}.`} key={number} onChange={handleChange(setsWord[index])}/>
              </label>
          ))}
          <input type="submit" value={'Confirm'} onClick={confirmHandler} />
        </div>
      </Column>

      {showPinCode &&
          <ModalPinCode onSuccess={onPinSuccess} setPinCode={setPinCode} mode="registration" />
      }
    </Page>
  );
};

export default ConfirmKey;
