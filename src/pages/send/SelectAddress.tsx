import { useNavigate } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';
import Page from '../../components/containers/Page';
import { useEffect, useState } from 'react';
import { usePage } from '../../hooks/usePage';
import AddressInput from '../../components/inputs/AddressInput';
import { useTmaMainButton } from '../../hooks/useTma';
import { Address } from '@ton/core';
import Delimiter from '../../components/typography/Delimiter';

export type AssetType = {
  thumb: string;
  title: string;
  description: string;
  wallet: string;
  coin: string;
};

const SelectAddress = () => {
  const t = useLanguage('send-select-address');
  const navigate = useNavigate();
  const page = usePage();
  const btn = useTmaMainButton();
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

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

  useEffect(() => {
    page.setLoading(false, false);
  }, []);

  useEffect(() => {
    btn.init(
      t('continue', 'button'),
      () => {
        console.log(address);
        navigate('/send/amount', {});
      },
      isButtonEnabled
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isButtonEnabled]);

  return (
    <Page>
      <AddressInput
        onChange={handleInputChange}
        value={address}
        className={`${error ? 'input-error' : ''}`}
      />
      <Delimiter />
    </Page>
  );
};

export default SelectAddress;
