import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import trxModalThunkActions from "features/modal/trxModal";
import { trxModalActions } from "features/modal/trxModalSlice";
import { trxIsOpenedSelector } from "features/modal/trxSelector";
import type { TransactionDto } from "types/transaction";

import type { AppDispatch } from "../../store";

function useTrxModalManagement() {
  const dispatch: AppDispatch = useDispatch();
  const isOpened = useSelector(trxIsOpenedSelector);

  useEffect(() => {
    if (isOpened) {
      const closeTimeout = setTimeout(() => {
        confirm(undefined);
      }, 10000);

      return () => {
        clearTimeout(closeTimeout);
      };
    }
  }, [isOpened]);

  const open = async (trxHash?: string, trxData?: TransactionDto | undefined) => {
    const { payload } = await dispatch(trxModalThunkActions.open({ trxHash, trxInitData: trxData }));
    return payload as string | undefined;
  };

  const confirm = (value: string | undefined) => dispatch(trxModalActions.confirm(value));

  const decline = () => dispatch(trxModalActions.decline());

  return {
    isOpened,
    open,
    confirm,
    decline,
  };
}

export default useTrxModalManagement;
