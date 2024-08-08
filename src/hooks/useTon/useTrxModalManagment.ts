import { useDispatch, useSelector } from "react-redux";

import trxModalThunkActions from "../../features/modal/trxModal";
import { trxModalActions } from "../../features/modal/trxModalSlice";
import { trxIsOpenedSelector } from "../../features/modal/trxSelector";
import type { AppDispatch } from "../../store";
import type { TransactionDto } from "../../types/transaction";

function useTrxModalManagement() {
  const dispatch: AppDispatch = useDispatch();
  const isOpened = useSelector(trxIsOpenedSelector);

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
