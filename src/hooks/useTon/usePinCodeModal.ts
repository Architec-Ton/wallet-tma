import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import pinCodeModalThunkActions from "features/modal/pinModal";
import { pinCodeModalActions } from "features/modal/pinModalSlice";
import { pincodeIsOpenedSelector } from "features/modal/pinSelector";

import type { AppDispatch } from "../../store";

function usePinCodeModalManagement() {
  const dispatch: AppDispatch = useDispatch();
  const isOpened = useSelector(pincodeIsOpenedSelector);

  const open = useCallback(async () => {
    const { payload } = await dispatch(pinCodeModalThunkActions.open());
    return payload as string | undefined;
  }, [dispatch]);

  const confirm = useCallback((value: string | undefined) => dispatch(pinCodeModalActions.confirm(value)), [dispatch]);

  const decline = useCallback(() => dispatch(pinCodeModalActions.decline()), [dispatch]);

  return useMemo(
    () => ({
      isOpened,
      open,
      confirm,
      decline,
    }),
    [isOpened, open, confirm, decline],
  );
}

export default usePinCodeModalManagement;
