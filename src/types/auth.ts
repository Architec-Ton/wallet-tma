import { UserInfo } from "./user";

export type TAuthType = "telegram" | "web";

export interface WalletInfo {
  network: string;
  address: string;
  lastName?: string;
  isPremium: boolean;
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
