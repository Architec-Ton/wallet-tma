import { MarketModeEnum } from "features/market/marketSlice"
import { CoinDto } from "types/assest"
import { HistoryOrderDto } from "types/market"

export const assets: CoinDto[] = [
  {
    type: "jetton",
    meta: {
      address: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
      name: "Tether USD",
      description: "Tether Token for Tether USD",
      image: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=025",
      imageData: undefined,
      symbol: "USD₮",
      decimals: 6,
    },
    amount: 3.350929,
    usdPrice: 0,
    changePrice: 0
  },
  {
    type: "jetton",
    meta: {
      address: "EQBXRdZTk5P49mL0nOYfDR1VR33N3sPUgB7PNQMaj6DhxOJH",
      name: "ARC jetton",
      description: "ARC is the utility token released by the game launcher Architec.ton, based on the Telegram ecosystem. — ARC is the main token used inside games and the project's trading platform.",
      imageData: "UklGRioDAABXRUJQVlA4TB0DAAAv/8A/AOdAIGnz/pU9rAZBts38aV+Cz//8R9+AAnYAdqA4ip2jOHYKgM5RfEABBmTZtt22zWMxrUpGAlVIYv4jjUHgvYd7PxnRf0hsJCmSoiKPS3Vchz3/SL8O/zn85/CfIxC28ObOoxHpVt68e/mvLqTvWE7yt5qR8ZCxkWR1gW5XK4li3PQdJKvGlWbXVVLFuOnRSHZx3MHv3S62M5azlFf35LlrpWAGw13LuGkZRLXGjdquZdz0aMSgflZeu5btjO0sdtU9aexayzteTHYt46ZlEBc1Au+S7CK5g0Mjjupnxb9rPczA/WUm5aaxEZfVvRHvWsZNyyCua4T7ZSbdGaGVCuq04ty1dGfMUk91GyaGipCAid+aeIF6TE33wOquJ7iaQ0XBZTVBZiXBZhWhbr/FiE/3QSjlbGFOWkHeM5wftjQ77xTBfc54Zt5E9vQfkRsWzrKv/8gFDRk6ziiYyNFxQJGl26DCuUMysPDtOaaCi1wdBhjZugsy8nUWaOwZU7oKUOSc1E0eAo4inSQIOsp0EngU6iL4KNVBAOLRKfVveg1CyrUOQhS0DUQ0tAxGVDTK0ghIdLRJKyhR0iYw0dIiOFFTP0DRUztIUVQ3UNFUM1hRVS9g0VUraFFWIVsvcNFWI3hRtzyA0bc0iDGwILEXyFiYn7NgxsT8gMbYkH4JUGNkXmBj5X6ughtDm2RGAY6Zy2dLBzl2xnSgo25msKNvVsBjYEbQY24Qvsh953+W4WN/hsQvfsz9NvDxIHpcCB4fYseJwJnEi8CP3jhXZ4PnRM5P60XkZw+F1oVLq0L3gXWouhO1ulDd0dfgZUN38Jh3h0+EV5ML9bpgzfDrbYsga24dqNKFboa9ZV0gm+xV64K2g83N7sLa5MUmRNS1TdZmdsGdYe/wjeBrbk09n+ZIoP6p3zEyutgWfePS+5LhDi677BbHHfxhdc097WN1iTcNa8wtkju4/3C/8GTzJHi56XaHsm+vic1QHsJzB3e7Q9jNKBxCsml/CN+a/tyx+8MFrk3lQzju4GaK1OsTtki/Dv85/Ofwn+MPIgA=",
      symbol: "ARC",
      decimals: 9,
    },
    amount: 1.677922685,
    usdPrice: 0,
    changePrice: 0
  },
  {
    type: "jetton",
    meta: {
      address: "EQAj1qW6WZTd7sd33Uk48O3TqxNPMjYrgwRHAcBM8RcQCQAD",
      name: "BNK jetton",
      description: "BNK is a limited supply token that is the primary mining method for the official ARH token from the Arhitec.ton project.",
      imageData: "UklGRtwCAABXRUJQVlA4TM8CAAAv/8A/AP9gpm2b8qfsSbnGgSDbZv60L8Hnf/7r0DeggB2AHSgOxc6hOOwUAA84FGBAoq09VeyAOBxkLpzKtFor5P3fc4xMXEl6N6L/Dty2cST5+ul6mczM7j4A1M/pP6f/nP5z+s8fQOqSn1PVm8mbl/iss/+wBomLRWF/Nz5r7e/o+votuq5+s66l/56uoU+ga+n3qa65a9UV9G2YX5/WPDTr6vmA5A1dNR/J27p6PomumU+oK+UT6/r4h+iq+IfpWvgH68r4dcp5quS6Hn59dJtv062Q68L6NB/SA8TXa6D+t1n73S9Tof4HilWafU/d0KydMS07Wt0Js/PUDU1tfyNJdS8KmbzGuJqm3MlrkVESOuoaYzWNmahrEVvl4EleXg6t3MgL0m9yMJCXlxb5kOYKc7f3RaLUozy2K1QVCrKvr21W41mKNusizzUJiBi3lN3Pgayaum0/ZrFJ29/Zcc9bDdzxyH+m7jbDo5Y8dyutB9KQaknd6W5WrAit8nNAL8WFYNGehJpMpjFZT8A3jieBoiy2iaIpkFsYQVXgs0VSCrKRN7eAHlBayIk+AWgMwI8xhhDHGUAPjsqfX3puUyGDPDMvH0j54FkEGaYNcjAaLpFr4qlyRZLFDwaeRBCE1XLEFZAkC8OdXUCWLB270wtIk/XG6kKbKkiUrynGreoiHr99vyKegBQQEQv21H3E02EvKM0V5IpvbBRyY6VcWhvQ7Tuc3yo2T/85KWMag/e2cQk8t513b12Azu9k+2wuHo/FnnoYi0Ss3rBKKOKQLb+FDoXhi3pLXZJsSEP3Bc+8YRkvCN8N00xykLiSBDofIosEgZa73xZQkdtS3hf91zv6TzhTSsiaUolJkLW4UnoKMOLWG+ZxRZQt7mo8+jYZNCqPvmUJyMy3uMwWOba+XC1/HCh/hX3yv6uh7xinvy2gfk7/Of3n9J/Tf/4IAQA=",
      symbol: "BNK",
      decimals: 0,
    },
    amount: 102,
    usdPrice: 0,
    changePrice: 0
  },
]

export const order: HistoryOrderDto = {
  type: MarketModeEnum.BUY,
  fromAsset: {
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
  toAsset: {
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
  },
  createdAt: '2024-09-03T17:55:01.613282Z',
  status: "Created",
  fromValue: 10,
  toValue: 90,
  userName: "Username112233",
  stats: "20 Trades",
  uuid: "usdlfk-345345-sdlajfslkjdflkjlkj",
}