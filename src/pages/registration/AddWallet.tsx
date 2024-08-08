import { useEffect } from "react";

import { useTonAddress, useTonConnectModal } from "@tonconnect/ui-react";

import {
  iconPageAddWalletCircle,
  iconPageAddWalletImport,
  iconPageAddWalletKey,
  iconPageAddWalletNextPage,
} from "../../assets/icons/pages/add-wallet";
import TileButton from "../../components/buttons/TileButton";
import Column from "../../components/containers/Column";
import Page from "../../components/containers/Page";
import { setLoading } from "../../features/page/pageSlice";
import { TonConnectionMode } from "../../features/ton/tonSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import useLanguage from "../../hooks/useLanguage";
import useLocalStorage from "../../hooks/useLocalStorage";
import useRouter from "../../hooks/useRouter";
import { useTon } from "../../hooks/useTon";
import type { WalletsState } from "../../types/auth";

function AddWallet() {
  const t = useLanguage("AddWallet");
  const ton = useTon();
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const address = useTonAddress();

  const { state, open } = useTonConnectModal();

  const [_, setStoredValue] = useLocalStorage<WalletsState>("wData", {
    currentWallet: -1,
    wallets: [],
  });

  const handleTonConnect = async () => {
    open();
  };

  useEffect(() => {
    if (state.status == "closed" && state.closeReason == "wallet-selected" && address) {
      ton.setAddress(address, TonConnectionMode.tonconnect);

      setStoredValue({
        currentWallet: 0,
        wallets: [
          {
            network: "ton",
            mode: TonConnectionMode.tonconnect,
            address,
          },
        ],
      });
    }
  }, [state]);

  useEffect(() => {
    if (ton.mode == TonConnectionMode.tonconnect) {
      navigate("/");
    }
  }, [ton.mode]);

  const addWalletButtons = [
    {
      name: "create",
      icon: iconPageAddWalletCircle,
      onClick: () => navigate("/registration/secret-key"),
    },
    {
      name: "existing",
      icon: iconPageAddWalletKey,
      onClick: () => navigate("/registration/existing"),
    },
    {
      name: "import",
      icon: iconPageAddWalletImport,
      onClick: () => {
        handleTonConnect();
      },
    },
  ];

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  return (
    <Page title={t("AddWallet")}>
      <Column>
        {addWalletButtons.map((btn) => (
          <TileButton
            icon={btn.icon}
            key={btn.name}
            title={t(`${btn.name}-title`)}
            description={t(`${btn.name}-description`)}
            iconAction={iconPageAddWalletNextPage}
            onClick={btn.onClick}
          />
        ))}
      </Column>
    </Page>
  );
}

export default AddWallet;
