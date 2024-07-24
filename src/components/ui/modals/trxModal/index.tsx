import { useEffect, useState } from "react";
import { useApiGetTransactionMutation } from "../../../../features/modal/trxModalApi";
import TransactionModal from "../transactionModal";
import {
  TransactionDto,
  TransactionModalInit,
} from "../../../../types/transaction";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { trxModalActions } from "../../../../features/modal/trxModalSlice";

const ModalTrx = ({ trxHash, trxInitData }: TransactionModalInit) => {
  const [trxApi] = useApiGetTransactionMutation();
  const [trxData, setTrxData] = useState<TransactionDto | undefined>(
    trxInitData
  );
  const dispatch = useAppDispatch();

  const handlerOnClose = () => {
    console.log("onclose");
    dispatch(trxModalActions.decline());
  };

  useEffect(() => {
    if (trxHash) {
      const fetchData = async (trx: string) => {
        const transactionData = await trxApi(trx).unwrap();
        if (transactionData) setTrxData(transactionData);
      };
      fetchData(trxHash);
    }
  }, [trxHash]);
  return (
    <>
      <TransactionModal
        trx={trxData}
        onClose={handlerOnClose}
      ></TransactionModal>
    </>
  );
};

export default ModalTrx;
