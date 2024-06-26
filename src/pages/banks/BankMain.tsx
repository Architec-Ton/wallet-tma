import { useEffect, useState } from 'react';
import Column from '../../components/containers/Column';
import Page from '../../components/containers/Page';
import History from '../../components/ui/balance/History';
import { selectAuthIsReady } from '../../features/auth/authSelector';
import {
  selectIsTonLoading,
  selectTonMode,
} from '../../features/ton/tonSelector';
import { TonConnectionMode } from '../../features/ton/tonSlice';
import { useApiWalletInfoMutation } from '../../features/wallet/walletApi';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { usePage } from '../../hooks/usePage';
import useRouter from '../../hooks/useRouter';
import { WalletInfoData } from '../../types/wallet';
import Button from '../../components/buttons/Button';
import BlockWithTitle from '../../components/typography/BlockWithTitle';
import { iconStakeButton, iconTasksButton } from '../../assets/icons/buttons';
import useLanguage from '../../hooks/useLanguage';
import BankBalance from '../../components/ui/balance/BankBalance';

function BankMain() {
  const navigate = useRouter();
  const t = useLanguage('bank');

  const [walletInfoData, setWalletInfoData] = useState<WalletInfoData | null>(
    null
  );
  const isTonLoading = useAppSelector(selectIsTonLoading);
  const tonMode = useAppSelector(selectTonMode);
  const page = usePage();
  const [walletInfoApi] = useApiWalletInfoMutation();
  const isReady = useAppSelector(selectAuthIsReady);
  //const isTmaReady = useAppSelector(selectAuthIsTmaReady);

  const handleInfo = async () => {
    try {
      const result = await walletInfoApi(null).unwrap();
      console.log('Wallet result:', result);
      setWalletInfoData(result);
    } catch (err) {
      console.error('Failed to get info: ', err);
    } finally {
      page.setLoading(false, true);
    }
  };

  useEffect(() => {
    page.setTitle(t('title'));
  }, []);

  useEffect(() => {
    console.log('walletInfoData', walletInfoData);
  }, [walletInfoData]);

  useEffect(() => {
    console.log('isTonLoading', isTonLoading);
    if (!isTonLoading) {
      // console.log("Call ", isTonLoading, tonMode);
      if (tonMode == TonConnectionMode.disconnect) {
        // console.log("mode disconnect");
        navigate('/registration/welcome');
      } else {
        // TODO: Get Balance data
        if (isReady) handleInfo();
      }
    }
  }, [isTonLoading, tonMode, isReady]);

  return (
    <Page>
      <Column>
        <BankBalance walletInfoData={walletInfoData}></BankBalance>
        <Column columns={2}>
          <BlockWithTitle title={t('Staking')} hintMessage={t('Staking-hint')}>
            <Button
              title={t('Stake')}
              className="w-100 center"
              icon={iconStakeButton}
              onClick={() => navigate('/bank/stake')}
            />
          </BlockWithTitle>
          <BlockWithTitle title={t('Quests')} hintMessage={t('Quests-hint')}>
            <Button
              title={t('Tasks')}
              className="w-100 center"
              icon={iconTasksButton}
              onClick={() => navigate('/bank/tasks')}
            />
          </BlockWithTitle>
          <BlockWithTitle
            title={t('Refferals')}
            hintMessage={t('Refferals-hint')}>
            construction
          </BlockWithTitle>
          <BlockWithTitle title={t('Bankers')} hintMessage={t('Bankers-hint')}>
            construction
          </BlockWithTitle>
        </Column>
        <History />
      </Column>
    </Page>
  );
}

export default BankMain;
