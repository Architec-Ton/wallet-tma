import { useEffect } from "react";
import Column from "../components/containers/Column";
import Page from "../components/containers/Page";
import Balance from "../components/ui/balance/Balance";
import { useAppSelector } from "../hooks/useAppDispatch";
import useRouter from "../hooks/useRouter";
import { usePage } from "../hooks/usePage";
import { selectIsTonLoading, selectTonMode } from "../features/ton/tonSelector";
import { TonConnectionMode } from "../features/ton/tonSlice";
import WalletMenu from "../components/ui/menu/WalletMenu";
import Assets from "../components/ui/balance/Assets";
import History from "../components/ui/balance/History";

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
        page.setLoading(false, true);
      }
    }
  }, [isTonLoading, tonMode]);

  return (
    <Page>
      <Column>
        <Balance></Balance>
        <WalletMenu />
        <Assets />
        <History />
      </Column>
    </Page>
  );
}

export default Main;
