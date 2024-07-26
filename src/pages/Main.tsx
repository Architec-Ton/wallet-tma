import { useEffect, useState } from "react";
import Column from "../components/containers/Column";
import Page from "../components/containers/Page";
import Assets from "../components/ui/balance/Assets";
import Balance from "../components/ui/balance/Balance";
import WalletMenu from "../components/ui/menu/WalletMenu";
import { selectAuthIsReady } from "../features/auth/authSelector";
import { selectIsTonLoading, selectTonMode } from "../features/ton/tonSelector";
import { TonConnectionMode } from "../features/ton/tonSlice";
import { useApiWalletInfoMutation } from "../features/wallet/walletApi";
import { useAppSelector } from "../hooks/useAppDispatch";
import { usePage } from "../hooks/usePage";
import useRouter from "../hooks/useRouter";
import { WalletInfoData } from "../types/wallet";
import { NavLink } from "react-router-dom";
import { useTon } from "../hooks/useTon";
import HistoryWidget from "../components/ui/balance/HistoryWidget";

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
  const ton = useTon();
  // const trx = useTrxModalManagement();
  // const [mnemonic] = useLocalStorage<string>('mnemonic', '');
  //const isTmaReady = useAppSelector(selectAuthIsTmaReady);

  const handleInfo = async () => {
    try {
      const result = await walletInfoApi(null).unwrap();
      // console.log("Wallet result:", result);
      setWalletInfoData(result);

      if (result) {
        if (result.currentWallet > -1) {
          ton.setSeqno(result.wallets[result.currentWallet].seqno);
        }
      }
    } catch (err) {
      console.error("Failed to get info: ", err);
    } finally {
      page.setLoading(false, true);
    }
  };

  useEffect(() => {
    page.setTitle("Main", "Page");

    // const handle = async () => {
    //   const tx = await trx.open(
    //     "4551436b6147515443554d557a753562394944595934456a474934684c49726e6e4b61356f416867796d7870396971592e3233393334383430303030303032",
    //     {
    //       amount: 54554,
    //       source: "dfsfdssdf",
    //     } as TransactionDto
    //   );

    //   navigate(0);

    //   console.log("tx", tx);
    // };
    // handle();
  }, []);

  useEffect(() => {
    // console.log("walletInfoData", walletInfoData);
  }, [walletInfoData]);

  useEffect(() => {
    // console.log("isTonLoading", isTonLoading);
    // if (mnemonic.length !== 0) {
    //   // TODO load data from blockchain
    //   console.log(mnemonic)
    // } else
    if (!isTonLoading) {
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
        {walletInfoData &&
          walletInfoData.wallets[walletInfoData.currentWallet].history.length >
            0 && (
            <HistoryWidget
              items={
                walletInfoData.wallets[walletInfoData.currentWallet].history
              }
            >
              <NavLink to="/histories">See more</NavLink>
            </HistoryWidget>
          )}
      </Column>
    </Page>
  );
}

export default Main;
