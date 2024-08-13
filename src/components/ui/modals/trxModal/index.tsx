import React, { useEffect, useState } from "react";

import { useApiGetTransactionMutation } from "features/modal/trxModalApi";
import { trxModalActions } from "features/modal/trxModalSlice";
import type { TransactionDto, TransactionModalInit } from "types/transaction";

import { useAppDispatch } from "hooks/useAppDispatch";
import { useTmaMainButton } from "hooks/useTma";

import TransactionModal from "../transactionModal";

const ModalTrx = ({ trxHash, trxInitData }: TransactionModalInit) => {
  const [trxApi] = useApiGetTransactionMutation();
  const btn = useTmaMainButton();
  const [trxData, setTrxData] = useState<TransactionDto | undefined>(trxInitData);
  const dispatch = useAppDispatch();

  const handlerOnClose = () => {
    dispatch(trxModalActions.decline());
  };

  useEffect(() => {
    if (trxHash) {
      const fetchData = async (trx: string) => {
        try {
          const transactionData = await trxApi(trx).unwrap();
          if (transactionData) setTrxData(transactionData);
        } catch {}
      };
      fetchData(trxHash);
    }
    btn.setVisible(false);
  }, [trxHash]);

  return (
    <>
      <TransactionModal trx={trxData} onClose={handlerOnClose} />
    </>
  );
};

export default ModalTrx;
