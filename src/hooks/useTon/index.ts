import { useAppDispatch } from "../useAppDispatch";
import { tonConnect } from "./tonConnect";

export function useTon() {
  //const { setMainButton } = useTmaState();
  const dispatch = useAppDispatch();

  tonConnect();

  return {};
}
