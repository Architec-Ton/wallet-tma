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

import "./BankStaking.styles.css"
import Section from '../../components/containers/Section';
import Row from '../../components/containers/Row';
import Delimiter from '../../components/typography/Delimiter';
import ListBlock from '../../components/ui/listBlock';
import Block from '../../components/typography/Block';
import ListBaseItem from '../../components/ui/listBlock/ListBaseItem';

const stakeHistory = {
  date: "20.02.2024",
  lockPeriod: "90 d",
  rewards: 1000,
  claimDate: "20.06.2024"
}

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
    <Page title={t('title')} className="staking-page">
      <Delimiter />
      <Column>
        <Section>
          <Row className="staking-form-container">
            <Column className="grow">
              <Row>
                <input type="text" value={100000} />
                <div className="text-secondary">BANK</div>
              </Row>
              <div><span>APR</span> 32-45%</div>
            </Column>
            <button className="control-button rounded-button">Shake All</button>
          </Row>
        </Section>
        <BankStakingInfo />
<<<<<<< HEAD
        <h2>{arc.toLocaleString()} ARC</h2>
        <button onClick={() => handleStake(1)}>Stake 1 BNK</button>
        <button onClick={() => handleStakeInfo()}>Stake info</button>
        <button onClick={() => handleUnstake()}>UnStake</button>
        <button onClick={() => handleClaim()}>Claim</button>
=======
        <Section title="History">
          {!stakeHistory && <Block className="stake-history-loss">Your stakes will apear here</Block>}
          {stakeHistory && (
            <ListBlock>
              <ListBaseItem>
                <div>Date</div>
                <div>{stakeHistory.date}</div>
              </ListBaseItem>
              <ListBaseItem>
                <div>Lock pariod</div>
                <div>{stakeHistory.lockPeriod}</div>
              </ListBaseItem>
              <ListBaseItem>
                <div>Your rewards</div>
                <div>{stakeHistory.rewards}</div>
              </ListBaseItem>
              <ListBaseItem>
                <span>Claim Available</span>
                <div>{stakeHistory.claimDate}</div>
              </ListBaseItem>
            </ListBlock>
          )}
        </Section>
>>>>>>> 2978a35 (stacking)
      </Column>
    </Page>
  );
}

export default BankStaking;
