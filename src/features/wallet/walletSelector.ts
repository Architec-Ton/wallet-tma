import type { RootState } from "../../store";

export const selectTonUsdPrice = (state: RootState) => state.wallet.tonUsdPrice;
