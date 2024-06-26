import { RootState } from "../../store";

export const selectBackButtonIsVisible = (state: RootState) =>
  state.backBtn.isVisible;
