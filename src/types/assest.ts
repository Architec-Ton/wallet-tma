export interface CoinMetaDto {
  name: string;
  description: string;
  address?: string;
  url?: string;
  image?: string;
  image_data?: string;
  decimals?: number;
  symbol?: string;
}

export interface CoinDto {
  type: string;
  amount: number;
  usdPrice: number;
  changePrice: number;
  meta?: CoinMetaDto;
}
