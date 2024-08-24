import { CoinDto } from "types/assest"

export const assets: CoinDto[] = [
  {
    type: "jetton",
    amount: 100,
    usdPrice: 1,
    changePrice: 1.1,
    meta: {
      name: "CRYSTALS",
      description: "",
      address: "cristals-adress",
      url: "",
      image: "",
      imageData: "",
      decimals: 6,
      symbol: "CRYSTALS",
    }
  },
  {
    type: "jetton",
    amount: 10,
    usdPrice: 10,
    changePrice: 10.1,
    meta: {
      name: "BNK",
      description: "",
      address: "bnk-adress",
      url: "",
      image: "",
      imageData: "",
      decimals: 6,
      symbol: "BNK",
    }
  },
  {
    type: "jetton",
    amount: 10,
    usdPrice: 1,
    changePrice: 1,
    meta: {
      name: "USDT",
      description: "",
      address: "usdt-adress",
      url: "",
      image: "",
      imageData: "",
      decimals: 6,
      symbol: "USDT",
    }
  },
]