import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../store";

const selectTmaState = (state: RootState) => state.tma;

export const selectIsTmaLoading = createSelector(selectTmaState, (tma) => tma.isTmaLoading);

export const selectIsTma = createSelector(selectTmaState, (tma) => tma.isTma);

export const selectReferral = createSelector(selectTmaState, (tma) => tma.referral);
