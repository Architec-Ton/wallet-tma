import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { trxModalActions } from "../../features/modal/trxModalSlice";
import trxModalThunkActions from "../../features/modal/trxModal";
import { TransactionDto } from "../../types/transaction";

function useTrxModalManagement() {
  const dispatch: AppDispatch = useDispatch();
  const { isOpened } = useSelector((state: RootState) => ({
    isOpened: state.trx.isOpened,
  }));

  const open = async (
    trxHash?: string,
    trxData?: TransactionDto | undefined
  ) => {
    const { payload } = await dispatch(
      trxModalThunkActions.open({ trxHash: trxHash, trxInitData: trxData })
    );
    return payload as string | undefined;
  };

  const confirm = (value: string | undefined) => {
    return dispatch(trxModalActions.confirm(value));
  };

  const decline = () => {
    return dispatch(trxModalActions.decline());
  };

  return {
    isOpened,
    open,
    confirm,
    decline,
  };
}

export default useTrxModalManagement;
