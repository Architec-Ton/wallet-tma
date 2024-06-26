import { RootState } from "../../store";

export const selectAddress = (state: RootState) => state.ton.address;
export const selectIsTonLoading = (state: RootState) => state.ton.isTonLoading;
export const selectTonMode = (state: RootState) => state.ton.mode;
