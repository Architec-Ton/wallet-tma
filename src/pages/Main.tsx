import { useEffect, useState } from "react";
import Column from "../components/containers/Column";
import Page from "../components/containers/Page";
import Assets from "../components/ui/balance/Assets";
import Balance from "../components/ui/balance/Balance";
import History from "../components/ui/balance/History";
import WalletMenu from "../components/ui/menu/WalletMenu";
import { selectAuthIsReady } from "../features/auth/authSelector";
import { selectIsTonLoading, selectTonMode } from "../features/ton/tonSelector";
import { TonConnectionMode } from "../features/ton/tonSlice";
import { useApiWalletInfoMutation } from "../features/wallet/walletApi";
import { useAppSelector } from "../hooks/useAppDispatch";
import { usePage } from "../hooks/usePage";
import useRouter from "../hooks/useRouter";
import { WalletInfoData } from "../types/wallet";
import useLocalStorage from "../hooks/useLocalStorage.ts";

function Main() {
  const navigate = useRouter();

  const [walletInfoData, setWalletInfoData] = useState<WalletInfoData | null>(
    null
  );
  const isTonLoading = useAppSelector(selectIsTonLoading);
  const tonMode = useAppSelector(selectTonMode);
  const page = usePage();
  const [walletInfoApi] = useApiWalletInfoMutation();
  const isReady = useAppSelector(selectAuthIsReady);
  const [mnemonic] = useLocalStorage<string>("mnemonic", '');
  //const isTmaReady = useAppSelector(selectAuthIsTmaReady);

  const handleInfo = async () => {
    try {
      const result = await walletInfoApi(null).unwrap();
      console.log("Wallet result:", result);
      setWalletInfoData(result);
    } catch (err) {
      console.error("Failed to get info: ", err);
    } finally {
      page.setLoading(false, true);
    }
  };

  useEffect(() => {
    page.setTitle("Main", "Page");
  }, []);

  useEffect(() => {
    console.log("walletInfoData", walletInfoData);
  }, [walletInfoData]);

  useEffect(() => {
    console.log("isTonLoading", isTonLoading);
    if (mnemonic.length !== 0) {
      // TODO load data from blockchain
      console.log(mnemonic)
    } else if (!isTonLoading) {
      // console.log("Call ", isTonLoading, tonMode);
      if (tonMode == TonConnectionMode.disconnect) {
        // console.log("mode disconnect");
        navigate("/registration/welcome");
      } else {
        // TODO: Get Balance data
        if (isReady) handleInfo();
      }
    }
  }, [isTonLoading, tonMode, isReady]);

  return (
    <Page>
      <Column>
        <Balance walletInfoData={walletInfoData}></Balance>
        <WalletMenu />
        <Assets
          assets={
            walletInfoData
              ? walletInfoData.wallets[walletInfoData.currentWallet].assets
              : []
          }
        />
        <History />
      </Column>
    </Page>
  );
}

export default Main;
