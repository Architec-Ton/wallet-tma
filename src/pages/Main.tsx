import { useEffect } from "react";
import Column from "../components/containers/Column";
import Page from "../components/containers/Page";
import Balance from "../components/ui/balance/Balance";
import { useAppSelector } from "../hooks/useAppDispatch";
import useRouter from "../hooks/useRouter";
import { usePage } from "../hooks/usePage";
import { selectIsTonLoading, selectTonMode } from "../features/ton/tonSelector";
import { TonConnectionMode } from "../features/ton/tonSlice";

function Main() {
  const navigate = useRouter();
  const isTonLoading = useAppSelector(selectIsTonLoading);
  const tonMode = useAppSelector(selectTonMode);
  const page = usePage();
  useEffect(() => {
    page.setTitle("Main", "Page");
    console.log("isTonLoading", isTonLoading);
    if (!isTonLoading) {
      console.log("Call ", isTonLoading, tonMode);
      if (tonMode == TonConnectionMode.disconnect) {
        console.log("mode disconnect");
        navigate("/registration/welcome");
      } else {
        // TODO: Get Balance data
        page.setLoading(false);
      }
    }
  }, [isTonLoading, tonMode]);

  return (
    <Page>
      <Column>
        <Balance></Balance>
      </Column>
    </Page>
  );
}

export default Main;
