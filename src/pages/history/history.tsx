import { useEffect, useState } from "react";
import Page from "../../components/containers/Page";
import { useApiWalletHistoryMutation } from "../../features/wallet/walletApi";
import { TransactionHistoryItemDto } from "../../types/history";
import { usePage } from "../../hooks/usePage";
import History from "../../components/ui/balance/History";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { selectAuthIsReady } from "../../features/auth/authSelector";

function Histories() {
  //   const t = useLanguage("history");
  const page = usePage();
  const isReady = useAppSelector(selectAuthIsReady);

  const [walletHistoryApi] = useApiWalletHistoryMutation();
  const [walletItemsData, setWalletItemsData] = useState<
    TransactionHistoryItemDto[]
  >([]);

  const handleInfo = async () => {
    try {
      const result = await walletHistoryApi(null).unwrap();
      //   console.log("Wallet result:", result);
      setWalletItemsData(result);
    } catch (err) {
      console.error("Failed to get info: ", err);
    } finally {
      page.setLoading(false, true);
    }
  };

  useEffect(() => {
    if (isReady) handleInfo();
  }, [isReady]);

  return (
    <Page>
      <History items={walletItemsData} />
    </Page>
  );
}

export default Histories;
