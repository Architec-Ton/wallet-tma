import type { ChangeEventHandler } from "react";
import React, { useEffect, useMemo, useRef, useState } from "react";
// useCallback,
// import bankIcon from "../../assets/images/bank.png";
import { useNavigate } from "react-router-dom";

import type { Address } from "@ton/core";
// import { formatDate } from "date-fns";
// import PartialContent from "../../components/ui/modals/PartialContent";
import classNames from "classnames";

import Column from "../../components/containers/Column";
import Page from "../../components/containers/Page";
import Row from "../../components/containers/Row";
import Section from "../../components/containers/Section";
import Delimiter from "../../components/typography/Delimiter";
import type { StakeHistoryType } from "../../components/ui/bank/BankStakingHistorySection";
import BankStakingHistorySection from "../../components/ui/bank/BankStakingHistorySection";
import BankStakingInfo from "../../components/ui/bank/BankStakingInfo";
import { useApiWalletInfoMutation } from "../../features/wallet/walletApi";
import useContracts from "../../hooks/useContracts";
import useLanguage from "../../hooks/useLanguage";
import { usePage } from "../../hooks/usePage";
// import useRouter from '../../hooks/useRouter';
import { useTmaMainButton } from "../../hooks/useTma";
import { useTon } from "../../hooks/useTon";
import type { CoinDto } from "../../types/assest";
import type { WalletInfoData } from "../../types/wallet";
import "./BankStaking.styles.css";

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
  const [stakeHistory, setStakeHistory] = useState<StakeHistoryType | null | undefined>(undefined);
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
    if (stakeHistory === undefined) handleStakeInfo();
  }, [stakeHistory, ton]);

  const handleStake = async (amount: number, ownerAddress: Address | undefined) => {
    if (ownerAddress) {
      // Get BNK Wallet address
      try {
        const walletAddress = await contracts.bank.getWallet(ownerAddress);

        if (walletAddress) {
          const tx = await contracts.bank.stake(walletAddress, BigInt(amount));
          console.log({ tx });
          navigate("/bank", { replace: true });
        }
      } catch (e) {
        console.error("Error", e);
      }
    }
  };

  const handleStakeInfo = async () => {
    if (ton.wallet.address) {
      const ownerAddress = ton.wallet.address;
      // Get BNK Wallet address
      try {
        const stakeAddress = await contracts.bank.getStakeAddress(ownerAddress);

        if (stakeAddress) {
          // setStakeAddress(stakeAddress.toString());
          let stakeInfo;
          try {
            stakeInfo = await contracts.bank.getStakeInfo(stakeAddress, ownerAddress);
          } catch (e) {
            console.error("not have staking", e);
          }

          if (stakeInfo && stakeInfo.stakedAmount > 0) {
            const rewards = Number((stakeInfo.calculatedAmount * 100n) / 1_000_00n) / 100_000_0;
            setStakeHistory({
              date: new Date(Number(stakeInfo.time) * 1000).toString(),
              deposit: Number(stakeInfo.stakedAmount),
              rewards,
              claimAvailable: true,
            });
            setStakingValue(Number(stakeInfo.stakedAmount));
            setReceivingValue(rewards);
            // setReturnValue(
            //   (rewards * Number(arcAsset?.usdPrice)) / tonUsdPrice
            // );
            // setIsStakeAvailable(false);
          } else {
            setStakeHistory(null);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleUnstake = async () => {
    // if (ton.wallet.address) {
    // Get BNK Wallet address
    btn.setVisible(false);
    if (stakeHistory) {
      setStakeHistory({
        ...stakeHistory,
        claimAvailable: false,
      });
    }
    try {
      const tx = await contracts.bank.unstake();
      console.log("Unstake tx", tx);
    } catch (e) {
      console.error(e);
    }

    navigate("/bank", { replace: true });
    // }
  };

  const handleClaim = async () => {
    if (ton.wallet.address) {
      // Get BNK Wallet address
      btn.setVisible(false);
      if (stakeHistory) {
        setStakeHistory({
          ...stakeHistory,
          claimAvailable: false,
        });
      }
      try {
        const tx = await contracts.bank.claim();
      } catch (e) {
        console.error(e);
      }
      navigate("/bank", { replace: true });
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
    const { value } = e.currentTarget;
    if (!Number.isNaN(Number(value)) && value.length <= 7) {
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
    return parameter; // (/* self.amount *  */self.durationTime() * parameter / 86400);  // 60sec*60min*24hour  )
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
    if (stakingValue > 0) {
      btn.init(t("unstake", "button"), transactionUnstakeHandler, true);
    } else if (Number(value) > 0) {
      const transactionSuccessHandler = async () => {
        try {
          await handleStake(Number(value), ton.wallet.address);
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

  return (
    <Page title={t("title")} className="staking-page">
      <Delimiter />
      <Column>
        {stakingValue === 0 && (
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
                      {value != "" && Number(value).toLocaleString(undefined).replaceAll(",", " ")}
                    </div>
                  </div>
                  <div className="staking-asset-title">{bnkAsset?.meta?.name}</div>
                </Row>
              </Column>
              <button className="control-button rounded-button" onClick={stakeAllHandler}>
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
          // readMore={<Link to="/bank/stake/history">{t("see-all")}</Link>}
          onClaim={handleClaim}
        />
      </Column>
    </Page>
  );
}

export default BankStaking;
