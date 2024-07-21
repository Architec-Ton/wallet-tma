import { useDispatch, useSelector } from "react-redux";
import pinCodeModalThunkActions from "../../features/modal/pinModal";
import { AppDispatch, RootState } from "../../store";
import { pinCodeModalActions } from "../../features/modal/pinModalSlice";

function usePinCodeModalManagement() {
  const dispatch: AppDispatch = useDispatch();
  const { isOpened } = useSelector((state: RootState) => ({
    isOpened: state.pincode.isOpened,
  }));

  const open = async () => {
    const { payload } = await dispatch(pinCodeModalThunkActions.open());
    return payload as string | undefined;
  };

  const confirm = (value: string | undefined) => {
    return dispatch(pinCodeModalActions.confirm(value));
  };

  const decline = () => {
    return dispatch(pinCodeModalActions.decline());
  };

  return {
    isOpened,
    open,
    confirm,
    decline,
  };
}

export default usePinCodeModalManagement;
