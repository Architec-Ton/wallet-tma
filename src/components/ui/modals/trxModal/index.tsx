import { useEffect, useState } from 'react';
import { useApiGetTransactionMutation } from '../../../../features/modal/trxModalApi';
import TransactionModal from '../transactionModal';
import {
  TransactionDto,
  TransactionModalInit,
} from '../../../../types/transaction';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { trxModalActions } from '../../../../features/modal/trxModalSlice';
import { useTmaMainButton } from '../../../../hooks/useTma';

const ModalTrx = ({ trxHash, trxInitData }: TransactionModalInit) => {
  const [trxApi] = useApiGetTransactionMutation();
  const btn = useTmaMainButton();
  const [trxData, setTrxData] = useState<TransactionDto | undefined>(
    trxInitData
  );
  const dispatch = useAppDispatch();

  const handlerOnClose = () => {
    console.log('onclose');
    dispatch(trxModalActions.decline());
  };

  useEffect(() => {
    if (trxHash) {
      const fetchData = async (trx: string) => {
        try {
          const transactionData = await trxApi(trx).unwrap();
          if (transactionData) setTrxData(transactionData);
        } catch {
          console.log('cath error');
        }
      };
      fetchData(trxHash);
    }
    btn.setVisible(false);
  }, [trxHash]);
  return (
    <>
      <TransactionModal
        trx={trxData}
        onClose={handlerOnClose}></TransactionModal>
    </>
  );
};

export default ModalTrx;
