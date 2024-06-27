import { useEffect } from "react";
import Column from "../components/containers/Column";
import Page from "../components/containers/Page";
import { useAppSelector } from "../hooks/useAppDispatch";
import useRouter from "../hooks/useRouter";
import { usePage } from "../hooks/usePage";
import { selectIsTonLoading, selectTonMode } from "../features/ton/tonSelector";
import { TonConnectionMode } from "../features/ton/tonSlice";
import { useTon } from "../hooks/useTon";

function Account() {
  const navigate = useRouter();
  const isTonLoading = useAppSelector(selectIsTonLoading);
  const tonMode = useAppSelector(selectTonMode);
  const page = usePage();
  const ton = useTon();
  useEffect(() => {
    page.setTitle("Account", "Page");
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
        <button onClick={() => ton.setDisconnect()} className="btn">
          Disconnect
        </button>
        {/* {tonMode == TonConnectionMode.tonconnect && <TonConnectButton />} */}
      </Column>
    </Page>
  );
}

export default Account;
