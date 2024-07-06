import { useTonClient } from './useTonClient';
import { Address, OpenedContract, toNano } from '@ton/core';
import { BankJettonWallet, Stake } from '../contracts/tact_BankJettonWallet';
import { useTon } from './useTon/index';
import { BankJetton } from '../contracts/tact_BankJetton';
import {
  BANK_CROWDSALE_ADDRESS,
  BANK_GAS_AMOUNT,
  BANK_JETTON_MASTER_ADDRESS,
} from '../constants';
import { StakeStorage } from '../contracts/tact_StakeStorage';
import {
  BanksCrowdSaleV3 as BanksCrowdSale,
  ReferralAddress,
} from '../contracts/tact_BanksCrowdSaleV3';

function useContracts() {
  const { client } = useTonClient();
  const { sender } = useTon();

  // if (network === CHAIN.MAINNET) {
  //   return null;
  // }

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
    bank: {
      buy: (amount: bigint) => {
        bankCrowdSale()?.send(
          sender,
          { value: amount + toNano(BANK_GAS_AMOUNT) },
          'buyBank'
        );
      },
      buyWithRefferal: (referralAddress: Address, amount: bigint) => {
        bankCrowdSale()?.send(
          sender,
          { value: amount + toNano(BANK_GAS_AMOUNT) },
          {
            referral: referralAddress,
          } as ReferralAddress
        );
      },

      stake: (walletAddress: Address, amount: bigint) =>
        bankJettonWallet(walletAddress)?.send(
          sender,
          { value: toNano(BANK_GAS_AMOUNT) },
          {
            $$type: 'Stake',
            query_id: 0n,
            amount: amount,
          } as Stake
        ),
      unstake: () =>
        bankJettonMaster()?.send(
          sender,
          { value: toNano(BANK_GAS_AMOUNT) },
          'Unstake'
        ),
      claim: () =>
        bankJettonMaster()?.send(
          sender,
          { value: toNano(BANK_GAS_AMOUNT) },
          'Claim'
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
