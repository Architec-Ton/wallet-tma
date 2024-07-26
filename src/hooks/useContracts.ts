import { useTonClient } from "./useTonClient";
import { Address, beginCell, OpenedContract, toNano } from "@ton/core";
import { BankJettonWallet, Stake } from "../contracts/tact_BankJettonWallet";
import { useTon } from "./useTon/index";
import { BankJetton } from "../contracts/tact_BankJetton";
import {
  BANK_CROWDSALE_ADDRESS,
  BANK_GAS_AMOUNT,
  BANK_JETTON_MASTER_ADDRESS,
} from "../constants";
import { StakeStorage } from "../contracts/tact_StakeStorage";
import {
  BanksCrowdSaleV3 as BanksCrowdSale,
  ReferralAddress,
} from "../contracts/tact_BanksCrowdSaleV3";
import { ArcJetton } from "../contracts/tact_ArcJetton";
import {
  ArcJettonWallet,
  JettonTransfer,
} from "../contracts/tact_ArcJettonWallet";

function useContracts() {
  const { client } = useTonClient();
  const { sender } = useTon();

  // if (network === CHAIN.MAINNET) {
  //   return null;
  // }

  const jettonWallet = (
    address: Address
  ): OpenedContract<ArcJettonWallet> | undefined => {
    if (!client) return;
    const contract = ArcJettonWallet.fromAddress(address);
    return client.open(contract) as OpenedContract<ArcJettonWallet>;
  };
  const jettonMaster = (
    address: Address
  ): OpenedContract<ArcJetton> | undefined => {
    if (!client) return;
    const contract = ArcJetton.fromAddress(address);
    return client.open(contract) as OpenedContract<ArcJetton>;
  };

  const bankJettonWallet = (
    address: Address
  ): OpenedContract<BankJettonWallet> | undefined => {
    if (!client) return;
    const contract = BankJettonWallet.fromAddress(address);
    return client.open(contract) as OpenedContract<BankJettonWallet>;
  };
  const bankJettonMaster = (): OpenedContract<BankJetton> | undefined => {
    if (!client) return;
    const contract = BankJetton.fromAddress(
      Address.parse(BANK_JETTON_MASTER_ADDRESS)
    );
    return client.open(contract) as OpenedContract<BankJetton>;
  };

  const bankCrowdSale = (): OpenedContract<BanksCrowdSale> | undefined => {
    if (!client) return;
    const contract = BanksCrowdSale.fromAddress(
      Address.parse(BANK_CROWDSALE_ADDRESS)
    );
    return client.open(contract) as OpenedContract<BanksCrowdSale>;
  };

  const bankStakeStorage = (
    address: Address
  ): OpenedContract<StakeStorage> | undefined => {
    if (!client) return;
    const contract = StakeStorage.fromAddress(address);
    return client.open(contract) as OpenedContract<StakeStorage>;
  };

  return {
    jetton: {
      getWallet: async (jettonMasterAddress: Address, ownerAddress: Address) =>
        jettonMaster(jettonMasterAddress)?.getGetWalletAddress(ownerAddress),

      transfer: async (
        walletAddress: Address,
        destinationAddress: Address,
        amount: bigint
      ) =>
        jettonWallet(walletAddress)?.send(
          sender,
          {
            value: toNano(BANK_GAS_AMOUNT),
            bounce: true,
          },
          {
            $$type: "JettonTransfer",
            query_id: 0n,
            destination: destinationAddress,
            response_destination: destinationAddress,
            amount: amount,
            forward_ton_amount: 100n,
            custom_payload: beginCell().endCell(),
            forward_payload: beginCell().endCell(),
          } as JettonTransfer
        ),
    },

    bank: {
      buy: (amount: bigint) =>
        bankCrowdSale()?.send(
          sender,
          { value: amount + toNano(BANK_GAS_AMOUNT) },
          "buyBank"
        ),
      buyWithReferral: (referralAddress: Address, amount: bigint) =>
        bankCrowdSale()?.send(
          sender,
          { value: amount + toNano(BANK_GAS_AMOUNT) },
          {
            $$type: "ReferralAddress",
            referral: referralAddress,
          } as ReferralAddress
        ),
      stake: (walletAddress: Address, amount: bigint) =>
        bankJettonWallet(walletAddress)?.send(
          sender,
          { value: toNano(5 * BANK_GAS_AMOUNT) },
          {
            $$type: "Stake",
            query_id: 0n,
            amount: amount,
          } as Stake
        ),
      unstake: () =>
        bankJettonMaster()?.send(
          sender,
          { value: toNano(BANK_GAS_AMOUNT) },
          "Unstake"
        ),
      claim: () =>
        bankJettonMaster()?.send(
          sender,
          { value: toNano(BANK_GAS_AMOUNT) },
          "Claim"
        ),
      getWallet: (ownerAddress: Address) =>
        bankJettonMaster()?.getGetWalletAddress(ownerAddress),

      getStakeAddress: (ownerAddress: Address) =>
        bankJettonMaster()?.getCalculateStakeAddress(ownerAddress),

      getStakeInfo: (stakeAddress: Address, ownerAddress: Address) =>
        bankStakeStorage(stakeAddress)?.getAmountTime(ownerAddress),
    },
  };
}

export default useContracts;
