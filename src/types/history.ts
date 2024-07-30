export interface TransactionHistoryItemDto {
  type: string;
  utime: number;
  addressFrom: string;
  addressTo: string;
  status: boolean;
  value: number;
  symbol: string;
  comment: string | undefined;
}
