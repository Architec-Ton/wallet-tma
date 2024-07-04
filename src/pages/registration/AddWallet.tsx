import Page from "../../components/containers/Page";
import useLanguage from "../../hooks/useLanguage";
import {
  iconPageAddWalletCircle,
  iconPageAddWalletImport,
  iconPageAddWalletKey,
  iconPageAddWalletNextPage,
} from "../../assets/icons/pages/add-wallet";
import Column from "../../components/containers/Column";
import TileButton from "../../components/buttons/TileButton";
import { useEffect } from "react";
import { setLoading } from "../../features/page/pageSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import useRouter from "../../hooks/useRouter";
import { useTonAddress, useTonConnectModal } from "@tonconnect/ui-react";
import { useTon } from "../../hooks/useTon";

function AddWallet() {
  const t = useLanguage("AddWallet");
  const ton = useTon();
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const address = useTonAddress();

  const { state, open } = useTonConnectModal();

  const handleTonConnect = async () => {
    open();
  };

  useEffect(() => {
    if (state.status == "closed" && state.closeReason == "wallet-selected") {
      console.log(state, address);
      ton.setAddress(address, "tonconnect");
    }
  }, [state]);

  useEffect(() => {
    if (ton.mode == "tonconnect") {
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
