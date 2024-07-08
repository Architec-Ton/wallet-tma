import { ChangeEventHandler, useEffect, useMemo, useRef, useState } from 'react';
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
import { useApiWalletInfoMutation } from '../../features/wallet/walletApi';
import { WalletInfoData } from '../../types/wallet';
import { CoinDto } from '../../types/assest';
import { initialAssets } from '../../mocks/mockAssets';
import ModalPinCode from '../../components/ui/modals/modalPinCode';
import bankIcon from '../../assets/images/bank.png'
import { Link, useNavigate } from 'react-router-dom';
import BankStakingHistorySection from '../../components/ui/bank/BankStakingHistorySection';
import { formatDate } from 'date-fns';
import { useTransaction } from '../../hooks/useTransaction';
import PartialContent from '../../components/ui/modals/PartialContent';

const stakeHistory = null

function BankStaking() {
  //   const navigate = useRouter();
  const page = usePage();
  const btn = useTmaMainButton();
  const t = useLanguage('bank-stake');
  const inputRef = useRef<HTMLInputElement>(null)
  const [walletInfoApi] = useApiWalletInfoMutation();
  const transaction = useTransaction()
  const navigate = useNavigate()
  const contracts = useContracts();
  const ton = useTon();

  const [value, setValue] = useState<string>('')
  const [stakingValue, setStagingValue] = useState<number>(0)
  const [receivingValue, setReceivingValue] = useState<number>(0)
  const [bnkAsset, setBnkAsset] = useState<CoinDto | undefined>()
  const [arcAsset, setArcAsset] = useState<CoinDto | undefined>()
  const [showPinCode, setShowPinCode] = useState<boolean>(false);
  const [arc, setArc] = useState<bigint>(0n);

  useEffect(() => {    
    walletInfoApi(null)
    .unwrap()
    .then((result: WalletInfoData) => {
      const { assets } = result.wallets[result.currentWallet];
      const bnk = assets.find(asset => asset.meta?.symbol === 'BNK')
      const arc = assets.find(asset => asset.meta?.symbol === 'ARC')
      setBnkAsset(bnk);
      setArcAsset(arc);
      page.setLoading(false);
    })
    .catch(() => {
      const bnk = initialAssets.find(asset => asset.meta?.symbol === 'BNK')
      const arc = initialAssets.find(asset => asset.meta?.symbol === 'ARC')
      setBnkAsset(bnk);
      setArcAsset(arc);
      page.setLoading(false);
    });
    
    btn.init(
      t('stake', 'button'),
      () => {
        setShowPinCode(true)
      },
      false
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

  useEffect(() => {
    if (bnkAsset && arcAsset) {
      transaction.init({
        commission: 0.17,
        returnValue: 0.125,
        address: arcAsset?.meta?.address as string,
        onSuccess: transactionSuccessHandler,
        tonUsdPrice: 6.7,
        completeIcon: bankIcon,
        completeTitle: t("complete-title", undefined, {value})
      })
    }
  }, [
    bnkAsset,
    arcAsset,
  ])

  useEffect(() => {
    setStagingValue(Number(value))
    setReceivingValue(calculateArc())
  }, [value])
  
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value
    if (!isNaN(Number(value)) && value.length <= 7) {
      setValue(value)
    }
  }

  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const stakeAllHandler = () => {
    inputRef.current?.focus()
    setValue(Number(bnkAsset?.amount).toString())
  }

  const isValid = useMemo(() => {
    return !isNaN(stakingValue) && stakingValue >= 1 && stakingValue <= Number(bnkAsset?.amount)
  }, [stakingValue, bnkAsset])

  useEffect(() => {
    if (isValid) {
      btn.setVisible(true)
    } else {
      btn.setVisible(false)
    }
  }, [isValid])

  const infoItems = useMemo(() => {
    if (bnkAsset) {
      return [
        {
          title: t('balance'),
          value: `${bnkAsset.amount} ${bnkAsset.meta?.symbol}`,
        },
        {
          title: t("min-deposit"),
          value: `1 ${bnkAsset.meta?.symbol}`,
        },
        {
          title: t("rewards"),
          value: `${receivingValue} ARC`,
        },
      ];
    }
  }, [bnkAsset, receivingValue])

  const onPinSuccess = () => {
    setShowPinCode(false);
    transaction.open()
  };

  const calculateArc = () => {
    let parameter = 0
    if (stakingValue < 10) {
      parameter = 0.001
    } else if (stakingValue < 100) {
      parameter = 0.011
    } else if (stakingValue < 1000) {
      parameter = 0.22
    } else if (stakingValue < 10_000) {
      parameter = 2.5
    } else {
      parameter = 3
    }
    return parameter //(/* self.amount *  */self.durationTime() * parameter / 86400);  // 60sec*60min*24hour  )
  }

  const transactionSuccessHandler = async () => {
    try {
      await handleUnstake()
      await handleStake(stakingValue);
    } catch (e) {
      console.error(e);
    }
  };

  const onComplete = () => {
    navigate("/bank")
  }

  return (
    <Page title={t('title')} className="staking-page">
      <Delimiter />
      <Column>
        <Section>
          <Row className="staking-form-container">
            <Column className="">
              <Row className="staking-asset-container">
                <div  className="staking-asset" onClick={onClick}>
                  <input ref={inputRef} type="text" value={value} onChange={onChange} placeholder="0" inputMode="numeric" />
                  <div className="bank-value">
                    {value != '' && Number(value).toLocaleString(undefined).replaceAll(",", " ")}
                  </div>
                </div>
                <div className="staking-asset-title">{bnkAsset?.meta?.name}</div>
              </Row>
            </Column>
            <button className="control-button rounded-button" onClick={stakeAllHandler}>{t("all")}</button>
          </Row>
        </Section>
        <h2>{arc.toLocaleString()} ARC</h2>
        <button onClick={() => handleStake(1)}>Stake 1 BNK</button>
        <button onClick={() => handleStakeInfo()}>Stake info</button>
        <button onClick={() => handleUnstake()}>UnStake</button>
        <button onClick={() => handleClaim()}>Claim</button>
        
        <BankStakingInfo infoItems={infoItems} />
        <BankStakingHistorySection
          stakeHistory={stakeHistory}
          title={t("history-title")}
          readMore={<Link to="/bank/stake/history">{t("see-all")}</Link>}
          onClaim={handleClaim}
        />
      </Column>
      {showPinCode && (
        <ModalPinCode onSuccess={onPinSuccess} mode="registration" />
      )}
      {transaction.isOpen && (
        <PartialContent wait={[transaction.isOpen]} init={transaction.setPartialContent}>
          <Row className="transaction-assets">
            <img src={bnkAsset?.meta?.image} alt="" />
            <img src={arcAsset?.meta?.image} alt="" />
          </Row>
          <div className="">
            -{value} {bnkAsset?.meta?.symbol}
          </div>
          <div className="">
            +{receivingValue} {arcAsset?.meta?.symbol}
          </div>
          <div className="secondary-data">
            {Number(receivingValue) * Number(arcAsset?.usdPrice)} $
          </div>
          <div className="secondary-data">
            {t('page-title')} {formatDate(new Date(), "d MMMM, hh:mm")}
          </div>
        </PartialContent>
      )}
      
      {transaction.isComplete && (
        <PartialContent wait={[transaction.isComplete]} init={transaction.setPartialContent}>
          <div>
            {t("complete-description")} 
          </div>
          <button onClick={onComplete} className="primary-button rounded-button">{t("bank-button")}</button>
        </PartialContent>
      )}
    </Page>
  );
}

export default BankStaking;
