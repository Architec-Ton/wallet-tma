import { useMemo } from "react";

import type { OpenedContract } from "@ton/core";
import { Address, beginCell, toNano } from "@ton/core";

import { BANK_CROWDSALE_ADDRESS, BANK_GAS_AMOUNT, BANK_JETTON_MASTER_ADDRESS } from "../constants";
import { ArcJetton } from "../contracts/tact_ArcJetton";
import type { JettonTransfer } from "../contracts/tact_ArcJettonWallet";
import { ArcJettonWallet } from "../contracts/tact_ArcJettonWallet";
import { BankJetton } from "../contracts/tact_BankJetton";
import type { Stake } from "../contracts/tact_BankJettonWallet";
import { BankJettonWallet } from "../contracts/tact_BankJettonWallet";
import type { ReferralAddress } from "../contracts/tact_BanksCrowdSaleV3";
import { BanksCrowdSaleV3 as BanksCrowdSale } from "../contracts/tact_BanksCrowdSaleV3";
import { StakeStorage } from "../contracts/tact_StakeStorage";
import { useTon } from "./useTon/index";
import { useTonClient } from "./useTonClient";

function useContracts() {
  const { client } = useTonClient();
  const { sender } = useTon();

  const jettonWallet = useMemo(
    () =>
      (address: Address): OpenedContract<ArcJettonWallet> | undefined => {
        if (!client) return;
        const contract = ArcJettonWallet.fromAddress(address);
        return client.open(contract) as OpenedContract<ArcJettonWallet>;
      },
    [client],
  );

  const jettonMaster = useMemo(
    () =>
      (address: Address): OpenedContract<ArcJetton> | undefined => {
        if (!client) return;
        const contract = ArcJetton.fromAddress(address);
        return client.open(contract) as OpenedContract<ArcJetton>;
      },
    [client],
  );

  const bankJettonWallet = useMemo(
    () =>
      (address: Address): OpenedContract<BankJettonWallet> | undefined => {
        if (!client) return;
        const contract = BankJettonWallet.fromAddress(address);
        return client.open(contract) as OpenedContract<BankJettonWallet>;
      },
    [client],
  );
  const bankJettonMaster = useMemo(
    () => (): OpenedContract<BankJetton> | undefined => {
      if (!client) {
        return;
      }
      const contract = BankJetton.fromAddress(Address.parse(BANK_JETTON_MASTER_ADDRESS));
      return client.open(contract) as OpenedContract<BankJetton>;
    },
    [client],
  );

  const bankCrowdSale = useMemo(
    () => (): OpenedContract<BanksCrowdSale> | undefined => {
      if (!client) return;
      const contract = BanksCrowdSale.fromAddress(Address.parse(BANK_CROWDSALE_ADDRESS));
      return client.open(contract) as OpenedContract<BanksCrowdSale>;
    },
    [client],
  );

  const bankStakeStorage = useMemo(
    () =>
      (address: Address): OpenedContract<StakeStorage> | undefined => {
        if (!client) return;
        const contract = StakeStorage.fromAddress(address);
        return client.open(contract) as OpenedContract<StakeStorage>;
      },
    [client],
  );

  return {
    jetton: {
      getWallet: async (jettonMasterAddress: Address, ownerAddress: Address) =>
        jettonMaster(jettonMasterAddress)?.getGetWalletAddress(ownerAddress),

      transfer: async (walletAddress: Address, destinationAddress: Address, amount: bigint) =>
        jettonWallet(walletAddress)?.send(
          sender,
          {
            value: toNano(BANK_GAS_AMOUNT),
            // bounce: true,
          },
          {
            $$type: "JettonTransfer",
            query_id: 0n,
            destination: destinationAddress,
            response_destination: destinationAddress,
            amount,
            forward_ton_amount: 100n,
            custom_payload: beginCell().endCell(),
            forward_payload: beginCell().endCell(),
          } as JettonTransfer,
        ),
    },

    bank: {
      buy: async (amount: bigint) =>
        bankCrowdSale()?.send(sender, { value: amount + toNano(BANK_GAS_AMOUNT) }, "buyBank"),
      buyWithReferral: async (referralAddress: Address, amount: bigint) =>
        bankCrowdSale()?.send(sender, { value: amount + toNano(BANK_GAS_AMOUNT) }, {
          $$type: "ReferralAddress",
          referral: referralAddress,
        } as ReferralAddress),
      stake: async (walletAddress: Address, amount: bigint) =>
        bankJettonWallet(walletAddress)?.send(sender, { value: toNano(5 * BANK_GAS_AMOUNT) }, {
          $$type: "Stake",
          query_id: 0n,
          amount,
        } as Stake),
      unstake: async () => bankJettonMaster()?.send(sender, { value: toNano(BANK_GAS_AMOUNT) }, "Unstake"),
      claim: async () => bankJettonMaster()?.send(sender, { value: toNano(BANK_GAS_AMOUNT) }, "Claim"),
      getWallet: async (ownerAddress: Address) => bankJettonMaster()?.getGetWalletAddress(ownerAddress),

      getStakeAddress: async (ownerAddress: Address) => bankJettonMaster()?.getCalculateStakeAddress(ownerAddress),

      getStakeInfo: async (stakeAddress: Address, ownerAddress: Address) =>
        bankStakeStorage(stakeAddress)?.getAmountTime(ownerAddress),
    },
  };
}

export default useContracts;
