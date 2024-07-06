import { useEffect, useState } from 'react';
import Column from '../../components/containers/Column';
import Page from '../../components/containers/Page';
import useLanguage from '../../hooks/useLanguage';
// import useRouter from '../../hooks/useRouter';
import { useTmaMainButton } from '../../hooks/useTma';
import { usePage } from '../../hooks/usePage';
import BankStakingInfo from '../../components/ui/bank/BankStakingInfo';
import useContracts from '../../hooks/useContracts';
import { useTon } from '../../hooks/useTon';

function BankStaking() {
  //   const navigate = useRouter();
  const page = usePage();
  const btn = useTmaMainButton();

  const t = useLanguage('bank-stake');

  const contracts = useContracts();
  const ton = useTon();

  const [arc, setArc] = useState<bigint>(0n);

  useEffect(() => {
    page.setLoading(false);
    btn.init(
      t('stake', 'button'),
      () => {
        //   navigate('/registration/add-wallet');
      },
      true
    );
  }, []);

  const handleStake = async (amount: number) => {
    if (ton.wallet.address) {
      const ownerAddress = ton.wallet.address;
      //Get BNK Wallet address
      const walletAddress = await contracts.bank.getWallet(ownerAddress);
      console.log('BNK Wallet', walletAddress?.toString());
      if (walletAddress) {
        const tx = await contracts.bank.stake(walletAddress, BigInt(amount));
        console.log('Transaction:', tx);
      }
    }
  };

  const handleStakeInfo = async () => {
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
        if (stakeInfo) setArc(stakeInfo?.calculatedAmount);
        console.log('getStakeInfo:', stakeInfo);
      }
    }
  };

  const handleUnstake = async () => {
    if (ton.wallet.address) {
      //Get BNK Wallet address
      const tx = await contracts.bank.unstake();
      console.log('Unstake', tx);
    }
  };

  const handleClaim = async () => {
    if (ton.wallet.address) {
      //Get BNK Wallet address
      const tx = await contracts.bank.claim();
      console.log('Unstake', tx);
    }
  };

  return (
    <Page title={t('title')}>
      <Column>
        <BankStakingInfo />
        <h2>{arc.toLocaleString()} ARC</h2>
        <button onClick={() => handleStake(1)}>Stake 1 BNK</button>
        <button onClick={() => handleStakeInfo()}>Stake info</button>
        <button onClick={() => handleUnstake()}>UnStake</button>
        <button onClick={() => handleClaim()}>Claim</button>
      </Column>
    </Page>
  );
}

export default BankStaking;
