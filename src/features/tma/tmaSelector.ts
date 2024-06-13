import { RootState } from '../../store';

export const selectIsTmaLoading = (state: RootState) => state.tma.isTmaLoading;
export const selectIsTma = (state: RootState) => state.tma.isTma;
