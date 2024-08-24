import { RootState } from "src/store";

export const marketSelector = (state: RootState) => state.market
export const marketModeSelector = (state: RootState) => state.market.mode
export const orderPrimaryAssetSelector = (state: RootState) => state.market.primaryAsset
export const orderSecondaryAssetSelector = (state: RootState) => state.market.secondaryAsset