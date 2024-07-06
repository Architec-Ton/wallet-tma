import { Address } from '@ton/core';
import { CoinDto } from './assest';

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
