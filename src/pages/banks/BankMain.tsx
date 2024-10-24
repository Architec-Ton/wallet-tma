import React, { useEffect, useState } from "react";

import type { Address } from "@ton/core";
import { toNano } from "@ton/core";
import { selectAuthIsReady } from "features/auth/authSelector";
import { useApiGetBankInfoMutation } from "features/bank/bankApi";
import type { BankInfoDto } from "types/banks";

import { iconStakeButton, iconTasksButton } from "assets/icons/buttons";

import { useAppSelector } from "hooks/useAppDispatch";
import useContracts from "hooks/useContracts";
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import useRouter from "hooks/useRouter";
import { useTon } from "hooks/useTon";
import { useTonClient } from "hooks/useTonClient";

import Button from "components/buttons/Button";
import Column from "components/containers/Column";
import Page from "components/containers/Page";
import BlockWithTitle from "components/typography/BlockWithTitle";
import BankBalance from "components/ui/balance/BankBalance";
import History from "components/ui/balance/History";
import BankMintingInfo from "components/ui/bank/BankMintingInfo";
import ReferralsInfo from "components/ui/bank/ReferralsInfo";

type StakeInfo = {
  for: Address;
  stakedAmount: bigint;
  time: bigint;
  calculatedAmount: bigint;
};

function BankMain() {
  const navigate = useRouter();
  const t = useLanguage("bank");
  const { client } = useTonClient();

  const [bankInfoData, setBankInfoData] = useState<BankInfoDto | null>(null);
  const [stakeInfoData, setStakeInfoData] = useState<StakeInfo | undefined>();
  // const isTonLoading = useAppSelector(selectIsTonLoading);
  // const tonMode = useAppSelector(selectTonMode);
  const page = usePage();
  const [bankInfoApi] = useApiGetBankInfoMutation();
  const isReady = useAppSelector(selectAuthIsReady);
  const [arc, setArc] = useState<bigint>(0n);
  const [bnk, setBnk] = useState<bigint>(0n);
  const contracts = useContracts();
  const ton = useTon();
  // const isTmaReady = useAppSelector(selectAuthIsTmaReady);

  const handleInfo = async () => {
    try {
      page.setLoading(true);
      const result = await bankInfoApi(null).unwrap();

      setBankInfoData(result);
      await handleStakeInfo(ton.wallet.address);
    } catch (err) {
      console.error("Failed to get info: ", err);
    } finally {
      page.setLoading(false);
    }
  };

  const handleStakeInfo = async (ownerAddress: Address | undefined) => {
    if (ownerAddress) {
      // const ownerAddress = ton.wallet.address;
      // Get BNK Wallet address
      const stakeAddress = await contracts.bank.getStakeAddress(ownerAddress);

      if (stakeAddress) {
        const stakeInfo = await contracts.bank.getStakeInfo(stakeAddress, ownerAddress);
        if (stakeInfo) {
          setStakeInfoData(stakeInfo);
          // setArc(stakeInfo?.calculatedAmount);
        }
        // if (stakeInfo) setBnk(stakeInfo?.stakedAmount);
      }
    } else {
      console.error("handleStakeInfo: Owner fail:", ownerAddress);
    }
  };

  useEffect(() => {
    page.setTitle(t("title"));
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

  // useEffect(() => {
  //   if (isReady && client) {
  //     handleStakeInfo(ton.wallet.address);
  //   }
  // }, [isReady, client]);

  // useEffect(() => {

  //   if (!isTonLoading) {

  //     if (tonMode === TonConnectionMode.disconnect) {

  //       navigate("/registration/welcome");
  //     } else {
  //       // TODO: Get Balance data
  //       if (isReady && !!client) handleInfo();
  //     }
  //   }
  // }, [isTonLoading, tonMode, isReady, client]);

  useEffect(() => {
    console.log("Ready:", isReady, client);
    if (isReady && !!client) handleInfo();
  }, [isReady, client]);

  return (
    <Page>
      <Column>
        <BankBalance address={ton.wallet.address?.toString({ urlSafe: true })} arcAmount={arc} bnkAmount={bnk} />
        <Column columns={2}>
          <BlockWithTitle title={t("Staking")} hintMessage={t("Staking-hint")}>
            <Button
              title={
                stakeInfoData && stakeInfoData.stakedAmount > 0
                  ? `${t("Unstake")}` // (${stakeInfoData.stakedAmount})
                  : t("Stake")
              }
              disabled={!!(bankInfoData && !bankInfoData.canStake)}
              className="w-100 center"
              icon={iconStakeButton}
              onClick={() => navigate("/bank/stake")}
            />
          </BlockWithTitle>
          <BlockWithTitle title={t("Quests")} hintMessage={t("quests-hints")}>
            <Button
              title={t("Tasks")}
              className="w-100 center"
              icon={iconTasksButton}
              onClick={() => navigate("/bank/tasks")}
            />
          </BlockWithTitle>
          <ReferralsInfo referrals={bankInfoData?.bankReferrals.referralsCount} />
          <BankMintingInfo bankInfo={bankInfoData} />
        </Column>
        <History items={bankInfoData ? bankInfoData.history : []} />
      </Column>
    </Page>
  );
}

export default BankMain;
