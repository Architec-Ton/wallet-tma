import { RootState } from '../../store';

export const selectTitle = (state: RootState) => state.page.title;
export const selectIsLoading = (state: RootState) => state.page.isLoading;
export const selectIsNavbarVisible = (state: RootState) => state.page.isNavbarVisible;
export const selectIsLibraryInitialized = (state: RootState) =>
  state.page.isLibraryInitialized;
export const selectIsApiLoading = (state: RootState) => state.page.isApiLoading;
