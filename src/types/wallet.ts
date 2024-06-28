import { Address } from '@ton/core';

export interface AuthInitTon {
  address: string;
  publicKey: string;
  network: string;
}

export interface WalletBalanceData {
  address: Address;
  usdPrice: number;
  changePrice: number;
}
