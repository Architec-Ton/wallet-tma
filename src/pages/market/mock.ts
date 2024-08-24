import { MarketModeEnum } from "features/market/marketSlice"
import { CoinDto } from "types/assest"
import { MarketOrderDto } from "types/market"

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

export const order: MarketOrderDto = {
  type: MarketModeEnum.BUY,
  assets: {
    primaryAsset: {
      type: "jetton",
      amount: 100,
      usdPrice: 1,
      changePrice: 1.1,
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
    secondaryAsset: {
      type: "jetton",
      amount: 10,
      usdPrice: 10,
      changePrice: 10.1,
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
    }
  },
  date: 1724238416,
  status: "Created",
  primaryValue: 10,
  secondaryValue: 90,
  userName: "Username112233",
  stats: "20 Trades",
  uid: "usdlfk-345345-sdlajfslkjdflkjlkj",
}