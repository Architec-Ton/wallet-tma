import { useEffect, useState } from "react";

import { useApiGetTransactionMutation } from "../../../../features/modal/trxModalApi";
import { trxModalActions } from "../../../../features/modal/trxModalSlice";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useTmaMainButton } from "../../../../hooks/useTma";
import { TransactionDto, TransactionModalInit } from "../../../../types/transaction";
import TransactionModal from "../transactionModal";

const ModalTrx = ({ trxHash, trxInitData }: TransactionModalInit) => {
  const [trxApi] = useApiGetTransactionMutation();
  const btn = useTmaMainButton();
  const [trxData, setTrxData] = useState<TransactionDto | undefined>(trxInitData);
  const dispatch = useAppDispatch();

  const handlerOnClose = () => {
    console.log("onclose");
    dispatch(trxModalActions.decline());
  };

  useEffect(() => {
    if (trxHash) {
      const fetchData = async (trx: string) => {
        try {
          const transactionData = await trxApi(trx).unwrap();
          if (transactionData) setTrxData(transactionData);
        } catch {
          console.log("cath error");
        }
      };
      fetchData(trxHash);
    }
    btn.setVisible(false);
  }, [trxHash]);
  return (
    <>
      <TransactionModal trx={trxData} onClose={handlerOnClose}></TransactionModal>
    </>
  );
};

export default ModalTrx;
