import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Column from '../../components/containers/Column.tsx';
import Page from '../../components/containers/Page.tsx';
import Input from '../../components/inputs/Input.tsx';
import useLanguage from '../../hooks/useLanguage.ts';
import './ConfirmKey.styles.css';
import { usePage } from '../../hooks/usePage.ts';
import useRouter from '../../hooks/useRouter.ts';
import ModalPinCode from '../../components/ui/modals/modalPinCode';
// import { usePage } from '../../hooks/usePage.ts';
import CryptoES from 'crypto-es';
import { sha256_sync } from '@ton/crypto';
import { useTmaMainButton } from '../../hooks/useTma.ts';
import { useLocation } from 'react-router-dom';

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const encodeMnemonic = (
  mnemonic: string,
  pinCode: string,
  uuid: string = ''
) => {
  return CryptoES.TripleDES.encrypt(
    mnemonic,
    sha256_sync(pinCode + uuid).toString()
  ).toString();
};

const decodeMnemonic = (hash: string, pinCode: string, uuid: string = '') => {
  return CryptoES.TripleDES.decrypt(
    hash,
    sha256_sync(pinCode + uuid).toString()
  ).toString(CryptoES.enc.Utf8);
};

const ConfirmKey: React.FC = () => {
  const t = useLanguage('Confirm');
  const navigate = useRouter();
  const page = usePage();
  const btn = useTmaMainButton();
  const { state } = useLocation(); // state is any or unknown

  const [mnemonics, setMnemonics] = useState<string[]>([]);
  const [inputs, setInputs] = useState<string[]>(Array(3).fill(''));
  const [mnemonicsVerifyIdx, setMnemonicsVerifyIdx] = useState<number[]>([
    3, 7, 17,
  ]);

  const [showPinCode, setShowPinCode] = useState<boolean>(false);
  const [showConfirmPinCode, setShowConfirmPinCode] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<string>('');
  const [confirmPinCode, setConfirmPinCode] = useState<string>('');
  const [privateHash, setPrivateHash] = useState<string>('');
  const [verificationStep, setVerificationStep] = useState<number>(0);

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newInputs = [...inputs];
      newInputs[index] = event.target.value;
      setInputs(newInputs);
    };

  const onPinSuccess = () => {
    console.log('onPinSuccess', pinCode);
    if (verificationStep == 0) {
      setShowPinCode(false);
      setVerificationStep(1);
      setShowConfirmPinCode(true);
      const privateHash = encodeMnemonic(mnemonics.join(' '), pinCode, 'salt');

      // console.log('privateHash:', privateHash);
      setPrivateHash(privateHash);
    }
  };

  const onConfirmPinSuccess = () => {
    console.log('onConfirmPinSuccess', confirmPinCode);
    if (verificationStep == 1) {
      console.log(pinCode, confirmPinCode);
      try {
        const mmDecoded = decodeMnemonic(privateHash, confirmPinCode, 'salt');
        // console.log('privateHash2:', mmDecoded);
        if (mmDecoded.split(' ').length == 24) {
          //TODO: save and setup
          navigate('/registration/completed');
        } else {
          setVerificationStep(0);
        }
      } catch (e) {
        setVerificationStep(0);
      } finally {
        setShowPinCode(false);
        setShowConfirmPinCode(false);
      }
    }
  };

  const confirmHandler = useCallback(() => {
    if (verificationStep == 0) {
      console.log('mnemonicsVerifyIdx', mnemonicsVerifyIdx);
      const checkMnemonics = mnemonicsVerifyIdx.map(
        (v, index) => mnemonics[v] == inputs[index].toLowerCase()
      );
      if (!checkMnemonics.every((v) => Boolean(v))) {
        console.log('Wrong inputs', checkMnemonics, inputs, mnemonicsVerifyIdx);
        return;
      }

      setShowPinCode(true);
    }
  }, [mnemonics, mnemonicsVerifyIdx, inputs]);

  const description = useMemo(
    () => (
      <p>
        {t('description')}{' '}
        <span>{mnemonicsVerifyIdx.map((v) => v + 1).join(', ')}</span>
      </p>
    ),
    [mnemonics, mnemonicsVerifyIdx, inputs]
  );

  useEffect(() => {
    const randomIdx = Array(3)
      .fill(0)
      .map(() => randomInt(0, 23));
    console.log('rand:', randomIdx);
    setMnemonicsVerifyIdx(randomIdx);
    if (state) {
      console.log('state', state.split(' '));
      setMnemonics(state.split(' '));
    }
    page.setLoading(false, false);
    btn.init(t('next', 'button'), () => confirmHandler);
  }, []);

  useEffect(() => {
    btn.init(t('next', 'button'), () => {
      confirmHandler();
    });
  }, [mnemonics, mnemonicsVerifyIdx, inputs]);

  return (
    <Page title={t('confirm-mnemonics')}>
      {description}
      <Column>
        <div className="container">
          {mnemonicsVerifyIdx.map((number, index) => (
            <label key={index}>
              <Input
                prefix={`${number + 1}.`}
                key={number}
                onChange={handleChange(index)}
              />
            </label>
          ))}
        </div>
      </Column>

      {showPinCode && (
        <ModalPinCode
          key={1}
          onSuccess={onPinSuccess}
          setPinCode={setPinCode}
          mode="registration"
        />
      )}
      {showConfirmPinCode && (
        <ModalPinCode
          key={2}
          onSuccess={onConfirmPinSuccess}
          setPinCode={setConfirmPinCode}
          mode="registration"
        />
      )}
    </Page>
  );
};

export default ConfirmKey;
