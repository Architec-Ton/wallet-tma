import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "store";

export const pincodeIsOpenedSelector = createSelector(
  (state: RootState) => state.pincode,
  (pincode) => pincode.isOpened,
);
