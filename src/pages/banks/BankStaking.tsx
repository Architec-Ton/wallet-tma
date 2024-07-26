import {
  ChangeEventHandler,
  // useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Column from "../../components/containers/Column";
import Page from "../../components/containers/Page";
import useLanguage from "../../hooks/useLanguage";
// import useRouter from '../../hooks/useRouter';
import { useTmaMainButton } from "../../hooks/useTma";
import { usePage } from "../../hooks/usePage";
import BankStakingInfo from "../../components/ui/bank/BankStakingInfo";
import useContracts from "../../hooks/useContracts";
import { useTon } from "../../hooks/useTon";

import "./BankStaking.styles.css";
import Section from "../../components/containers/Section";
import Row from "../../components/containers/Row";
import Delimiter from "../../components/typography/Delimiter";
import { useApiWalletInfoMutation } from "../../features/wallet/walletApi";
import { WalletInfoData } from "../../types/wallet";
import { CoinDto } from "../../types/assest";
// import bankIcon from "../../assets/images/bank.png";
import { Link, useNavigate } from "react-router-dom";
import BankStakingHistorySection, {
  StakeHistoryType,
} from "../../components/ui/bank/BankStakingHistorySection";
// import { formatDate } from "date-fns";

// import PartialContent from "../../components/ui/modals/PartialContent";
import classNames from "classnames";
// import { useAppSelector } from '../../hooks/useAppDispatch';
// import { selectAuthIsReady } from '../../features/auth/authSelector';
// import { useAppSelector } from "../../hooks/useAppDispatch";
// import { selectTonUsdPrice } from "../../features/wallet/walletSelector";
// import { useTonClient } from '../../hooks/useTonClient';

function BankStaking() {
  //   const navigate = useRouter();
  const page = usePage();
  const btn = useTmaMainButton();
  const t = useLanguage("bank-stake");
  const inputRef = useRef<HTMLInputElement>(null);
  const [walletInfoApi] = useApiWalletInfoMutation();
  const navigate = useNavigate();
  const contracts = useContracts();
  const ton = useTon();
  // const tonUsdPrice = useAppSelector(selectTonUsdPrice);
  // const { client } = useTonClient();

  const [value, setValue] = useState<string>("0");
  const [stakingValue, setStakingValue] = useState<number>(0);
  const [receivingValue, setReceivingValue] = useState<number>(0);
  // const [returnValue, setReturnValue] = useState<number>(0);
  const [bnkAsset, setBnkAsset] = useState<CoinDto | undefined>();
  const [arcAsset, setArcAsset] = useState<CoinDto | undefined>();
  // const [stakeAddress, setStakeAddress] = useState<string>();
  const [stakeHistory, setStakeHistory] = useState<StakeHistoryType | null>(
    null
  );
  // const isReady = useAppSelector(selectAuthIsReady);
  // const [isStakeAvailable, setIsStakeAvailable] = useState<boolean>(true);

  useEffect(() => {
    walletInfoApi(null)
      .unwrap()
      .then((result: WalletInfoData) => {
        const { assets } = result.wallets[result.currentWallet];
        const bnk = assets.find((asset) => asset.meta?.symbol === "BNK");
        const arc = assets.find((asset) => asset.meta?.symbol === "ARC");
        setBnkAsset(bnk);
        setArcAsset(arc);
        if (bnk) {
          setValue(Number(bnk?.amount).toString());
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        page.setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (ton.wallet.address && receivingValue == 0) handleStakeInfo();
  }, [ton]);

  const handleStake = async (amount: number) => {
    if (ton.wallet.address) {
      const ownerAddress = ton.wallet.address;
      //Get BNK Wallet address
      try {
        const walletAddress = await contracts.bank.getWallet(ownerAddress);
        console.log("BNK Wallet", walletAddress?.toString());
        if (walletAddress) {
          const tx = await contracts.bank.stake(walletAddress, BigInt(amount));
          console.log("Transaction:", tx);
          navigate("/bank", {replace: true});
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  const handleStakeInfo = async () => {
    if (ton.wallet.address) {
      const ownerAddress = ton.wallet.address;
      //Get BNK Wallet address
      try {
        const stakeAddress = await contracts.bank.getStakeAddress(ownerAddress);
        console.log("stakeAddress", stakeAddress);
        if (stakeAddress) {
          // setStakeAddress(stakeAddress.toString());

          const stakeInfo = await contracts.bank.getStakeInfo(
            stakeAddress,
            ownerAddress
          );

          console.log("stakeInfo", stakeInfo);
          if (stakeInfo && stakeInfo.stakedAmount > 0) {
            const rewards =
              Number((stakeInfo.calculatedAmount * 100n) / 1_000_00n) /
              100_000_0;
            setStakeHistory({
              date: new Date(Number(stakeInfo.time) * 1000).toString(),
              deposit: Number(stakeInfo.stakedAmount),
              rewards: rewards,
              claimAvailable: true,
            });
            setStakingValue(Number(stakeInfo.stakedAmount));
            setReceivingValue(rewards);
            // setReturnValue(
            //   (rewards * Number(arcAsset?.usdPrice)) / tonUsdPrice
            // );
            // setIsStakeAvailable(false);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    console.log("handleStakeInfo");
  };

  const handleUnstake = async () => {
    if (ton.wallet.address) {
      //Get BNK Wallet address
      btn.setVisible(false);
      if (stakeHistory) {
        setStakeHistory({
          ...stakeHistory,
          claimAvailable: false,
        });
      }
      try {
        const tx = await contracts.bank.unstake();
        console.log("Unstake", tx);
      } catch (e) {
        console.error(e);
      }

      navigate("/bank", {replace: true});
    }
  };

  const handleClaim = async () => {
    if (ton.wallet.address) {
      //Get BNK Wallet address
      btn.setVisible(false);
      if (stakeHistory) {
        setStakeHistory({
          ...stakeHistory,
          claimAvailable: false,
        });
      }
      try {
        const tx = await contracts.bank.claim();
        console.log("claim", tx);
      } catch (e) {
        console.error(e);
      }
      navigate("/bank", {replace: true});
    }
  };

  // useEffect(() => {
  //   if (bnkAsset) {
  //     transaction.init({
  //       commission: 0.17,
  //       returnValue: returnValue,
  //       address: stakeAddress as string,
  //       completeIcon: bankIcon,
  //       completeTitle: t("complete-title", undefined, { value }),
  //     });
  //   }
  // }, [bnkAsset, stakeAddress, returnValue, isStakeAvailable]);

  // useEffect(() => {
  //   if (!isNaN(Number(value))) {
  //     setStakingValue(Number(value));
  //   }
  //   if (arcAsset) {
  //     const returnValue = calculateArc(Number(value));
  //     // setReturnValue((returnValue * arcAsset.usdPrice) / tonUsdPrice);
  //     setReceivingValue(returnValue);
  //   }
  // }, [value, arcAsset]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    if (!isNaN(Number(value)) && value.length <= 7) {
      setValue(value);
    }
  };

  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const stakeAllHandler = () => {
    inputRef.current?.focus();
    if (Number(bnkAsset?.amount) > 0) {
      setValue(Number(bnkAsset?.amount).toString());
    }
    console.log(arcAsset);
  };

  // const isValid = useMemo(() => {
  //   return (
  //     !isNaN(stakingValue) &&
  //     stakingValue >= 1 &&
  //     stakingValue <= Number(bnkAsset?.amount)
  //   );
  // }, [stakingValue, bnkAsset]);

  // useEffect(() => {
  //   if (isValid) {
  //     btn.refresh(transactionSuccessHandler);
  //     btn.setVisible(true);
  //   } else {
  //     btn.setVisible(false);
  //   }
  // }, [isValid]);

  const calculateArc = (value: number) => {
    let parameter = 0;
    if (value <= 0) {
      return parameter;
    }
    if (value < 10) {
      parameter = 0.001;
    } else if (value < 100) {
      parameter = 0.011;
    } else if (value < 1000) {
      parameter = 0.22;
    } else if (value < 10000) {
      parameter = 2.5;
    } else {
      parameter = 3;
    }
    return parameter; //(/* self.amount *  */self.durationTime() * parameter / 86400);  // 60sec*60min*24hour  )
  };

  const infoItems = useMemo(() => {
    if (bnkAsset) {
      return [
        {
          title: t("balance"),
          value: `${bnkAsset.amount} ${bnkAsset.meta?.symbol}`,
        },
        {
          title: t("min-deposit"),
          value: `1 ${bnkAsset.meta?.symbol}`,
        },
        {
          title: t("rewards"),
          value: `${calculateArc(bnkAsset.amount)} ARC`,
        },
      ];
    }
  }, [bnkAsset, receivingValue]);

  const transactionUnstakeHandler = async () => {
    try {
      await handleUnstake();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log("My super:", value, stakingValue);
    if (stakingValue > 0) {
      btn.init(t("unstake", "button"), transactionUnstakeHandler, true);
    } else if (Number(value) > 0) {
      const transactionSuccessHandler = async () => {
        try {
          await handleStake(Number(value));
        } catch (e) {
          console.error(e);
        }
      };
      btn.init(t("stake", "button"), transactionSuccessHandler, true);
    }
  }, [value, stakingValue]);

  // const onComplete = () => {
  //   navigate("/bank");
  // };

  // console.log('stakingValue', stakingValue);

  return (
    <Page title={t("title")} className="staking-page">
      <Delimiter />
      <Column>
        {stakingValue == 0 && (
          <Section>
            <Row className="staking-form-container">
              <Column className="">
                <Row className="staking-asset-container">
                  <div
                    className={classNames("staking-asset", {
                      warning: stakingValue > Number(bnkAsset?.amount),
                    })}
                    onClick={onClick}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={value}
                      onChange={onChange}
                      placeholder="0"
                      inputMode="numeric"
                    />
                    <div className="bank-value">
                      {value != "" &&
                        Number(value)
                          .toLocaleString(undefined)
                          .replaceAll(",", " ")}
                    </div>
                  </div>
                  <div className="staking-asset-title">
                    {bnkAsset?.meta?.name}
                  </div>
                </Row>
              </Column>
              <button
                className="control-button rounded-button"
                onClick={stakeAllHandler}
              >
                {t("all")}
              </button>
            </Row>
          </Section>
        )}
        {/* <h2>{arc.toLocaleString()} ARC</h2>
        <button onClick={() => handleStake(1)}>Stake 1 BNK</button>
        <button onClick={() => handleStakeInfo()}>Stake info</button>
        <button onClick={() => handleUnstake()}>UnStake</button>
        <button onClick={() => handleClaim()}>Claim</button> */}

        <BankStakingInfo infoItems={infoItems} />
        <BankStakingHistorySection
          stakeHistory={stakeHistory}
          title={t("history-title")}
          readMore={<Link to="/bank/stake/history">{t("see-all")}</Link>}
          onClaim={handleClaim}
        />
      </Column>
    </Page>
  );
}

export default BankStaking;
