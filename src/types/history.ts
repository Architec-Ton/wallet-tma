export interface TransactionHistoryItemDto {
  type: string;
  utime: number;
  from: string;
  to: string;
  status: boolean;
  value: number;
  symbol: string;
  comment: string | null;
}
