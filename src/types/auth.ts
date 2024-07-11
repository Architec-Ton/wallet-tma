import { UserInfo } from './user';

export type TAuthType = 'telegram' | 'web';

export interface WalletState {
  network: string;
  mode: string;
  address?: string;
  publicKey?: string;
  privateKey?: string;
}

export interface WalletsState {
  currentWallet: number;
  wallets: WalletState[];
}

export interface WalletInfo {
  network: string;
  address: string;
  publicKey?: string;
}

export interface AuthInitTon {
  network: string;
  address: string;
  publicKey?: string;
  signature?: string;
}

export interface AuthInitData {
  authDate: string;
  queryId: string;
  hash: string;
  user: UserInfo;
}

export interface AuthDataRequest {
  initDataRaw?: AuthInitData;
  authType: TAuthType;
}
