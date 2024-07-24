export interface TransactionDto {
  type: string;
  hash?: string;
  utime: number;
  amount: number;
  amountUsd: number;
  commissionAmount?: number;
  returnAmount?: number;
  commissionUsd?: number;
  returnUsd?: number;
  source: string | null;
  destination: string | null;
  status: boolean;
  value: number;
  symbol: string;

  comment: string | null;
  iconSrc: string | null;
  iconDst: string | null;
}

export interface TransactionCreateDto {
  destination: string;
  value: string;
  body?: string;
  seqno?: number;
}

export interface TransactionCreateDtoOut {
  destination?: string;
  lt?: string;
  trxId: string;
}

export interface TransactionModalInit {
  trxHash?: string;
  trxInitData?: TransactionDto;
}
