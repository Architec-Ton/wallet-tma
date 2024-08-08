import { useDispatch, useSelector } from "react-redux";

import pinCodeModalThunkActions from "features/modal/pinModal";
import { pinCodeModalActions } from "features/modal/pinModalSlice";
import { pincodeIsOpenedSelector } from "features/modal/pinSelector";

import type { AppDispatch } from "../../store";

function usePinCodeModalManagement() {
  const dispatch: AppDispatch = useDispatch();
  const isOpened = useSelector(pincodeIsOpenedSelector);

  const open = async () => {
    const { payload } = await dispatch(pinCodeModalThunkActions.open());
    return payload as string | undefined;
  };

  const confirm = (value: string | undefined) => dispatch(pinCodeModalActions.confirm(value));

  const decline = () => dispatch(pinCodeModalActions.decline());

  return {
    isOpened,
    open,
    confirm,
    decline,
  };
}

export default usePinCodeModalManagement;
