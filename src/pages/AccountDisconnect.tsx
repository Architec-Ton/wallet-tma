import React, { useEffect, useState } from "react";

import { applicationSubmitIcon, walletSafetyIcon } from "assets/icons/settings";

import LinkButton from "components/buttons/LinkButton";

import { logOutIcon } from "../assets/icons/buttons";
import TileButton from "../components/buttons/TileButton";
import Column from "../components/containers/Column";
import Page from "../components/containers/Page";
import Address from "../components/ui/balance/Address";
import { selectIsTonLoading, selectTonMode } from "../features/ton/tonSelector";
import { TonConnectionMode } from "../features/ton/tonSlice";
import { useApiWalletInfoMutation } from "../features/wallet/walletApi";
import { useAppSelector } from "../hooks/useAppDispatch";
import useLanguage from "../hooks/useLanguage";
import { usePage } from "../hooks/usePage";
import useRouter from "../hooks/useRouter";
import { useTon } from "../hooks/useTon";
import type { WalletInfoData } from "../types/wallet";

function AccountDisconnect() {
  // const popup = initPopup()
  const t = useLanguage("account");
  const navigate = useRouter();
  const isTonLoading = useAppSelector(selectIsTonLoading);
  // const [tonConnectUI] = useTonConnectUI();
  const tonMode = useAppSelector(selectTonMode);
  const page = usePage();
  const ton = useTon();
  const [walletInfoData, setWalletInfoData] = useState<WalletInfoData | null>(null);
  const [walletInfoApi] = useApiWalletInfoMutation();

  const handleInfo = async () => {
    try {
      const result = await walletInfoApi(null).unwrap();

      setWalletInfoData(result);
    } catch (err) {
      console.error("Failed to get info: ", err);
    }
  };

  useEffect(() => {
    page.setTitle("Account", "Page");
    handleInfo().then(() => {
      if (!isTonLoading) {
        if (tonMode === TonConnectionMode.disconnect) {
          navigate("/registration/welcome");
        } else {
          // TODO: Получение данных баланса
          page.setLoading(false, true);
        }
      }
    });
  }, [isTonLoading, tonMode]);

  const onClick = () => {
    ton.setDisconnect();
  };

  const address = walletInfoData ? walletInfoData.wallets[walletInfoData.currentWallet].address.toString() : undefined;

  return (
    <Page title={t("account")}>
      <Column>
        <TileButton title={t("my-wallet")} onClick={onClick} iconAction={logOutIcon}>
          <Address address={address} copy={false} />
        </TileButton>
        {/* {tonMode === TonConnectionMode.tonconnect && <TonConnectButton />} */}

        <h2 className="title" style={{ marginTop: 24 }}>
          Settings
        </h2>

        <TileButton
          icon={walletSafetyIcon}
          title={t("wallet-safety")}
          onClick={() => navigate("/wallet-safety")}
          style={{ lineHeight: "2opx" }}
        />
        <LinkButton
          to="https://docs.google.com/forms/d/1VXgjs4JDzQ4uP8SNN9UM1TD5Hv_y3RxlVmoLJ5G_dMk/viewform?edit_requested=true"
          className="w-full"
        >
          <TileButton
            icon={applicationSubmitIcon}
            title={t("application-submit")}
            onClick={() => {}}
            style={{ lineHeight: "2opx" }}
            className="w-full"
          />
        </LinkButton>
      </Column>
    </Page>
  );
}

export default AccountDisconnect;
