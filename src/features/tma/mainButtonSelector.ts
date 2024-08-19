import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../store";

const selectBtnState = (state: RootState) => state.btn;

export const selectMainButtonTitle = createSelector(selectBtnState, (btn) => btn.title);

export const selectMainButtonIsLoading = createSelector(selectBtnState, (btn) => btn.isLoading);

export const selectMainButtonIsVisible = createSelector(selectBtnState, (btn) => btn.isVisible);

// export const selectIsApiLoading = createSelector(
//   (state: RootState) => state.page,
//   (page) => page.isApiLoading
// );
