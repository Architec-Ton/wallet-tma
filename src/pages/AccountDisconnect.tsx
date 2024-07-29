import { useEffect, useState } from 'react';
import Column from '../components/containers/Column';
import Page from '../components/containers/Page';
import { useAppSelector } from '../hooks/useAppDispatch';
import useRouter from '../hooks/useRouter';
import { usePage } from '../hooks/usePage';
import { selectIsTonLoading, selectTonMode } from '../features/ton/tonSelector';
import { TonConnectionMode } from '../features/ton/tonSlice';
import { useTon } from '../hooks/useTon';
import useLanguage from '../hooks/useLanguage.ts';
import { logOutIcon } from '../assets/icons/buttons';
import TileButton from '../components/buttons/TileButton.tsx';
import Address from '../components/ui/balance/Address.tsx';
import { useApiWalletInfoMutation } from '../features/wallet/walletApi.ts';
import { WalletInfoData } from '../types/wallet.ts';

function AccountDisconnect() {
  // const popup = initPopup()
  const t = useLanguage('account');
  const navigate = useRouter();
  const isTonLoading = useAppSelector(selectIsTonLoading);
  // const [tonConnectUI] = useTonConnectUI();
  const tonMode = useAppSelector(selectTonMode);
  const page = usePage();
  const ton = useTon();
  const [walletInfoData, setWalletInfoData] = useState<WalletInfoData | null>(
    null
  );
  const [walletInfoApi] = useApiWalletInfoMutation();

  const handleInfo = async () => {
    try {
      const result = await walletInfoApi(null).unwrap();
      console.log('Wallet result:', result);
      setWalletInfoData(result);
    } catch (err) {
      console.error('Failed to get info: ', err);
    }
  };

  useEffect(() => {
    page.setTitle('Account', 'Page');
    handleInfo().then(() => {
      console.log('isTonLoading', isTonLoading);
      if (!isTonLoading) {
        console.log('Call ', isTonLoading, tonMode);
        if (tonMode === TonConnectionMode.disconnect) {
          console.log('mode disconnect');
          navigate('/registration/welcome');
        } else {
          // TODO: Получение данных баланса
          page.setLoading(false, true);
        }
      }
    });
  }, [isTonLoading, tonMode]);

  const onClick = () => {
    ton.setDisconnect();
  };

  const address = walletInfoData
    ? walletInfoData.wallets[walletInfoData.currentWallet].address.toString()
    : undefined;

  return (
    <Page title={t('account')}>
      <Column>
        <TileButton
          title={t('my-wallet')}
          onClick={onClick}
          iconAction={logOutIcon}>
          <Address address={address} copy={false} />
        </TileButton>
        {/* {tonMode == TonConnectionMode.tonconnect && <TonConnectButton />} */}
      </Column>
    </Page>
  );
}

export default AccountDisconnect;
