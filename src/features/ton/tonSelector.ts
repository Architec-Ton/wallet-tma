import { RootState } from '../../store';

export const selectAddress = (state: RootState) => state.ton.address;
export const selectIsTonLoading = (state: RootState) => state.ton.isTonLoading;
export const selectTonMode = (state: RootState) => state.ton.mode;
export const selectAddressPublicKey = (state: RootState) => state.ton.publicKey;
export const selectAddressPrivateKey = (state: RootState) =>
  state.ton.privateKey;
