import type { RootState } from "../../store";

export const selectAssets = (state: RootState) => state.swap.assets;
