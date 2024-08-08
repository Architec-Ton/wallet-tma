import React, { useEffect, useState } from "react";

import { selectAuthIsReady } from "features/auth/authSelector";
import { useApiWalletHistoryMutation } from "features/wallet/walletApi";
import type { TransactionHistoryItemDto } from "types/history";

import { useAppSelector } from "hooks/useAppDispatch";
import { usePage } from "hooks/usePage";

import Page from "components/containers/Page";
import History from "components/ui/balance/History";

function Histories() {
  //   const t = useLanguage("history");
  const page = usePage();
  const isReady = useAppSelector(selectAuthIsReady);

  const [walletHistoryApi] = useApiWalletHistoryMutation();
  const [walletItemsData, setWalletItemsData] = useState<TransactionHistoryItemDto[]>([]);

  const handleInfo = async () => {
    try {
      const result = await walletHistoryApi(null).unwrap();

      setWalletItemsData(result);
      const result2 = await walletHistoryApi(null).unwrap();

      setWalletItemsData(result2);
    } catch (err) {
      console.error("Failed to get info: ", err);
    } finally {
      page.setLoading(false, true);
    }
  };

  useEffect(() => {
    if (isReady) {
      handleInfo();
    }
  }, [isReady]);

  return (
    <Page>
      <History items={walletItemsData} />
    </Page>
  );
}

export default Histories;
