import { useNavigate } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';
import Page from '../../components/containers/Page';
import { useEffect, useState } from 'react';
import { usePage } from '../../hooks/usePage';
import { useApiWalletAssetsMutation } from '../../features/wallet/walletApi';
import { CoinDto } from '../../types/assest';
import AssetsList from '../../components/ui/send/assets';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { selectAuthIsReady } from '../../features/auth/authSelector';
import AddressInput from '../../components/inputs/AddressInput';
import { useTmaMainButton } from '../../hooks/useTma';
import { Address } from '@ton/core';
import Delimiter from '../../components/typography/Delimiter';
import Row from '../../components/containers/Row';
import { iconPageSend } from '../../assets/icons/pages/send';
import { shortenString } from '../../components/ui/balance/Address';

export type AssetType = {
  thumb: string;
  title: string;
  description: string;
  wallet: string;
  coin: string;
};

const SendPage = () => {
  const t = useLanguage('send-select');
  const navigate = useNavigate();
  const [walletApiAssets] = useApiWalletAssetsMutation();
  const page = usePage();
  const [assets, setAssets] = useState<CoinDto[]>([]);
  const [asset, setAsset] = useState<CoinDto | null>(null);
  const [step, setStep] = useState<number>(0);
  const isReady = useAppSelector(selectAuthIsReady);
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const btn = useTmaMainButton();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    try {
      Address.parse(event.target.value);
      setError(false);
      setIsButtonEnabled(event.target.value != '');
    } catch (err) {
      setError(true);
      setIsButtonEnabled(false);
    }
  };

  const handlerClick = (asset: CoinDto) => {
    setStep(1);
    setAsset(asset);
  };

  const handleInfo = async () => {
    try {
      const result = await walletApiAssets(null).unwrap();
      console.log('Wallet result:', result);
      setAssets(result);
    } catch (err) {
      console.error('Failed to get info: ', err);
    } finally {
      page.setLoading(false, false);
    }
  };

  useEffect(() => {
    page.setTitle(t('choose-asset'));
    if (isReady) handleInfo();
  }, [isReady]);

  useEffect(() => {
    if (step == 1) {
      btn.init(
        t('continue', 'button'),
        () => {
          console.log(address);
          setStep(2);
        },
        isButtonEnabled
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isButtonEnabled, step]);

  return (
    <Page>
      {step == 0 && (
        <AssetsList assets={assets} title={t('title')} onClick={handlerClick} />
      )}
      {step == 1 && (
        <>
          <AddressInput
            onChange={handleInputChange}
            value={address}
            className={`${error ? 'input-error' : ''}`}
          />
          <Delimiter />
        </>
      )}
      {step == 2 && (
        <>
          <Row>
            <img src={iconPageSend} />
            <h2> Send to {shortenString(address)}</h2>
          </Row>
          <Delimiter />
          block here
        </>
      )}
    </Page>
  );
};

export default SendPage;
