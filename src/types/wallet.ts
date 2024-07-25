import { Address } from "@ton/core";
import { CoinDto } from "./assest";
import { TransactionHistoryItemDto } from "./history";

export interface AuthInitTon {
  address: string;
  publicKey: string;
  network: string;
}

export interface WalletBalanceData {
  address: Address;
  usdPrice: number;
  seqno: number | null;
  changePrice: number;
  assets: CoinDto[];
  history: TransactionHistoryItemDto[];
}

export interface WalletInfoData {
  currentWallet: number;
  wallets: WalletBalanceData[];
  tonUsdPrice?: number;
}
