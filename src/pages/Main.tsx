import React, { useEffect, useState } from "react";

import { selectAuthIsReady } from "features/auth/authSelector";
import { selectIsTonLoading, selectTonMode } from "features/ton/tonSelector";
import { TonConnectionMode } from "features/ton/tonSlice";
import { useApiWalletInfoMutation } from "features/wallet/walletApi";
import type { WalletInfoData } from "types/wallet";

import { useAppSelector } from "hooks/useAppDispatch";
import { usePage } from "hooks/usePage";
import useRouter from "hooks/useRouter";
import { useTon } from "hooks/useTon";

import Column from "components/containers/Column";
import Page from "components/containers/Page";
import Balance from "components/ui/balance/Balance";
import WalletMenu from "components/ui/menu/WalletMenu";
import Assets from "components/v2/assets";
import History from "components/v2/history";

function Main() {
  const navigate = useRouter();

  const [walletInfoData, setWalletInfoData] = useState<WalletInfoData | null>(null);
  const isTonLoading = useAppSelector(selectIsTonLoading);
  const tonMode = useAppSelector(selectTonMode);
  const page = usePage();
  const [walletInfoApi] = useApiWalletInfoMutation();
  const isReady = useAppSelector(selectAuthIsReady);
  const ton = useTon();

  const handleInfo = async () => {
    try {
      page.setLoading(true);
      const result = await walletInfoApi(null).unwrap();
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
  }, []);

  useEffect(() => {
    if (!isTonLoading) {
      if (tonMode === TonConnectionMode.disconnect) {
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
        <Balance walletInfoData={walletInfoData} />
        <WalletMenu />
        <Assets assets={walletInfoData ? walletInfoData.wallets[walletInfoData.currentWallet].assets : []} />
        <History items={walletInfoData?.wallets[walletInfoData.currentWallet].history} />
      </Column>
    </Page>
  );
}

export default Main;
