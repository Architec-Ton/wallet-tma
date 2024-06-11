import { RootState } from '../../store';

export const selectMainButtonTitle = (state: RootState) => state.btn.title;
export const selectMainBUttonIsLoading = (state: RootState) =>
  state.btn.isLoading;
export const selectMainButtonIsVisible = (state: RootState) =>
  state.btn.isVisible;
//export const selectIsApiLoading = (state: RootState) => state.page.isApiLoading;
