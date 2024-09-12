import { RootState } from "src/store";

export const marketSelector = (state: RootState) => state.market
export const marketModeSelector = (state: RootState) => state.market.mode
export const orderPrimaryAssetSelector = (state: RootState) => state.market.fromAsset
export const orderSecondaryAssetSelector = (state: RootState) => state.market.toAsset
export const marketOrdersSelector = (state: RootState) => state.market.orders
export const marketAssets = (state: RootState) => state.market.assets
export const marketWalletAssets = (state: RootState) => state.market.walletAssets