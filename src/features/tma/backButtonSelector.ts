import type { RootState } from "../../store";

export const selectBackButtonIsVisible = (state: RootState) => state.backBtn.isVisible;

export const selectBackButtonIsAppWasReloaded = (state: RootState) => state.backBtn.isAppWasReloaded;
