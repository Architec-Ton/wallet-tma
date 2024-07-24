import { Address } from '@ton/core';
import { CoinDto } from './assest';
import { TransactionHistoryItemDto } from './history';

export interface BankDto {
  banksAmount: number;
  archAmount: number;
  walletAddress: Address;
}

export interface BankBuyDto {
  ton: CoinDto;
  bnk: CoinDto;
  contract: Address | string;
}

export interface BankInfoDto {
  bnkAmount: number;
  bnkStackedAmount: number;
  arcAmount: number;
  arcStackedAmount: number;
  canStake: boolean;
  referrals: number;
  bankers: number;
  freeBanks: number;
  totalBanks: number;
  history: TransactionHistoryItemDto[];
}
