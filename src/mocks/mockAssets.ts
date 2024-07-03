import { iconPepe, iconTon, iconUsdt } from "../assets/icons/jettons";
import { CoinDto } from "../types/assest";

export const initialAssets: CoinDto[] = [
  {
    type: 'ton',
    amount: 100000,
    usdPrice: 7.7,
    changePrice: 1.2,
    meta: {
      name: 'Toncoin',
      description: '',
      address: 'Elkdfgj98098dfg098-dfgkjlkj-dfgkj',
      image: iconTon,
      decimals: 9,
      symbol: 'TON',
    },
  },
  {
    type: 'pepe',
    amount: 0,
    usdPrice: 0.0001,
    changePrice: 0.02,
    meta: {
      name: 'PEPE',
      description: '',
      address: 'Elkdfert8098dfg098-dfgkjlkj-dfgkj',
      image: iconPepe,
      decimals: 9,
      symbol: 'PEPE',
    },
  },
  {
    type: 'usdt',
    amount: 1000,
    usdPrice: 1,
    changePrice: 0.01,
    meta: {
      name: 'USDT',
      description: '',
      address: 'Elkdfert8098dfg098-dfgkjlkj-jklkj',
      image: iconUsdt,
      decimals: 6,
      symbol: 'USDT',
    },
  },
];