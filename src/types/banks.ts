import { Address } from '@ton/core';

export interface BankDto {
  banksAmount: number;
  archAmount: number;
  walletAddress: Address;
}
