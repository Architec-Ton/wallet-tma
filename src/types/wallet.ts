import { Address } from "@ton/core";
import { CoinDto } from "./assest";

export interface AuthInitTon {
  address: string;
  publicKey: string;
  network: string;
}

export interface WalletBalanceData {
  address: Address;
  usdPrice: number;
  changePrice: number;
  assets: CoinDto[];
}

export interface WalletInfoData {
  currentWallet: number;
  wallets: WalletBalanceData[];
  tonUsdPrice?: number
}
