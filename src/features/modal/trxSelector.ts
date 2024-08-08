import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../store";

export const trxIsOpenedSelector = createSelector(
  (state: RootState) => state.trx,
  (trx) => trx.isOpened,
);
