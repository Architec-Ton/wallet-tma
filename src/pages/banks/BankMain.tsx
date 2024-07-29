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
import { useAppSelector } from '../../hooks/useAppDispatch';
import { usePage } from '../../hooks/usePage';
import useRouter from '../../hooks/useRouter';
import Button from '../../components/buttons/Button';
import BlockWithTitle from '../../components/typography/BlockWithTitle';
import { iconStakeButton, iconTasksButton } from '../../assets/icons/buttons';
import useLanguage from '../../hooks/useLanguage';
import BankBalance from '../../components/ui/balance/BankBalance';
import useContracts from '../../hooks/useContracts';
import { useTon } from '../../hooks/useTon';
import ReferralsInfo from '../../components/ui/bank/ReferralsInfo';
import BankMintingInfo from '../../components/ui/bank/BankMintingInfo';
import { useTonClient } from '../../hooks/useTonClient';
import { useApiGetBankInfoMutation } from '../../features/bank/bankApi';
import { BankInfoDto } from '../../types/banks';
import { Address, toNano } from '@ton/core';

type StakeInfo = {
  for: Address;
  stakedAmount: bigint;
  time: bigint;
  calculatedAmount: bigint;
};

function BankMain() {
  const navigate = useRouter();
  const t = useLanguage('bank');
  const { client } = useTonClient();

  const [bankInfoData, setBankInfoData] = useState<BankInfoDto | null>(null);
  const [stakeInfoData, setStakeInfoData] = useState<StakeInfo | undefined>();
  const isTonLoading = useAppSelector(selectIsTonLoading);
  const tonMode = useAppSelector(selectTonMode);
  const page = usePage();
  const [bankInfoApi] = useApiGetBankInfoMutation();
  const isReady = useAppSelector(selectAuthIsReady);
  const [arc, setArc] = useState<bigint>(0n);
  const [bnk, setBnk] = useState<bigint>(0n);
  const contracts = useContracts();
  const ton = useTon();
  //const isTmaReady = useAppSelector(selectAuthIsTmaReady);

  const handleInfo = async () => {
    try {
      const result = await bankInfoApi(null).unwrap();
      console.log('Wallet result:', result);
      setBankInfoData(result);
    } catch (err) {
      console.error('Failed to get info: ', err);
    } finally {
      page.setLoading(false);
    }
  };

  const handleStakeInfo = async () => {
    console.log(ton.wallet.address);
    if (ton.wallet.address) {
      const ownerAddress = ton.wallet.address;
      //Get BNK Wallet address
      const stakeAddress = await contracts.bank.getStakeAddress(ownerAddress);
      console.log('BNK Stake Wallet', stakeAddress?.toString());
      if (stakeAddress) {
        const stakeInfo = await contracts.bank.getStakeInfo(
          stakeAddress,
          ownerAddress
        );
        if (stakeInfo) {
          setStakeInfoData(stakeInfo);
          // setArc(stakeInfo?.calculatedAmount);
        }
        // if (stakeInfo) setBnk(stakeInfo?.stakedAmount);
        // console.log('getStakeInfo:', stakeInfo);
      }
    }
  };

  useEffect(() => {
    page.setTitle(t('title'));
  }, []);

  useEffect(() => {
    let bnk = 0n;
    let arc = 0n;
    if (stakeInfoData) {
      bnk += stakeInfoData.stakedAmount;
      arc += stakeInfoData.calculatedAmount;
    }
    if (bankInfoData) {
      bnk += BigInt(bankInfoData.bnkAmount);
      arc += toNano(bankInfoData.arcAmount.toString());
    }

    setBnk(bnk);
    setArc(arc);
  }, [stakeInfoData, bankInfoData]);

  useEffect(() => {
    if (isReady && client) {
      handleStakeInfo();
    }
  }, [isReady, client]);

  useEffect(() => {
    console.log('walletInfoData', bankInfoData);
  }, [bankInfoData]);

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
        <BankBalance
          address={ton.wallet.address?.toString({ urlSafe: true })}
          arcAmount={arc}
          bnkAmount={bnk}></BankBalance>
        <Column columns={2}>
          <BlockWithTitle title={t('Staking')} hintMessage={t('Staking-hint')}>
            <Button
              title={
                stakeInfoData && stakeInfoData.stakedAmount > 0
                  ? `${t('Unstake')}` // (${stakeInfoData.stakedAmount})
                  : t('Stake')
              }
              disabled={bankInfoData && !bankInfoData.canStake ? true : false}
              className="w-100 center"
              icon={iconStakeButton}
              onClick={() => navigate('/bank/stake')}
            />
          </BlockWithTitle>
          <BlockWithTitle title={t('Quests')} hintMessage={t('quests-hints')}>
            <Button
              title={t('Tasks')}
              className="w-100 center"
              icon={iconTasksButton}
              onClick={() => navigate('/bank/tasks')}
            />
          </BlockWithTitle>
          <ReferralsInfo />
          <BankMintingInfo />
        </Column>
        <History items={bankInfoData ? bankInfoData.history : []} />
      </Column>
    </Page>
  );
}

export default BankMain;
