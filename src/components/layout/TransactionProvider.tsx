import { createContext, useEffect, useState } from "react"
import TransactionModal from "../ui/modals/transactionModal"
import { CoinDto } from "../../types/assest"
import TransactionCompleteModal from "../ui/modals/transactionCompleteModal"


type ProviderStateType = {
  from?: CoinDto | undefined;
  to?: CoinDto | undefined;
  sendedValue?: string;
  receivedValue?: string;
  commission?: number;
  returnValue?: number;
  address?: string;
  transactionType?: string;
  transactionData?: Date;
  inProgress?: boolean;
  tonUsdPrice?: number;
  onSuccess?: () => Promise<void>;
  completeIcon?: string;
  completeTitle?: string;
}

type ProviderValuesType = {
  open: () => void;
  destruct: () => void;
  setPartialContent: (c: React.ReactNode) => void
  setState: (k: string, v: any) => void
  state: ProviderStateType;
  isOpen: boolean | undefined;
  isComplete: boolean | undefined;
}

type TransactionHocPropsType = {
  children: React.ReactNode
}

export const TransactionContext = createContext<ProviderValuesType>({
  open: () => {},
  destruct: () => {},
  setPartialContent: () => {},
  setState: () => {},
  state: {},
  isOpen: false,
  isComplete: false,
})

const TransactionProvider = ({ children }: TransactionHocPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>()
  const [isComplete, setIsComplete] = useState<boolean>()
  const [partialContent, setPartialContent] = useState<React.ReactNode>()
  const [isTransactionInProgress, setIsTransactionInProgress] =
    useState<boolean>(false);

  // TransactionProvider state params
  const [state, setOwnState] = useState<ProviderStateType>({})

  const openHandler = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const destruct = () => {
    setIsOpen(false)
    setIsComplete(false)
  }

  const transactionSuccessHandler = async () => {
    if (state?.onSuccess) {
      setIsTransactionInProgress(true)
      state.onSuccess()
      .then(() => {
        setIsComplete(true)
      })
      .catch(e => {
        console.error(e)
      })
      .finally(() => {
        setIsTransactionInProgress(false)
        setIsOpen(false)
      })
    }
  };

  const setState = (key: string, value: any) => {
    setOwnState(state => {
      return {...state, [key]: value}
    })
  }
  
  return (
    <TransactionContext.Provider value={{
      open: openHandler,
      destruct: destruct,
      setPartialContent,
      setState,
      isOpen,
      isComplete,
      state
    }}>
      {children}
      {isOpen && (
        <TransactionModal
          onClose={onClose}
          onSuccess={transactionSuccessHandler}
          from={state?.from}
          to={state?.to}
          sendedValue={state?.sendedValue}
          receivedValue={state?.receivedValue}
          commission={state?.commission}
          returnValue={state?.returnValue}
          address={state?.address}
          transactionType={state?.transactionType}
          transactionData={new Date()}
          inProgress={isTransactionInProgress}
          tonUsdPrice={state?.tonUsdPrice}
        >{partialContent}</TransactionModal>
      )}
      {isComplete && (
        <TransactionCompleteModal
          onClose={() => setIsComplete(false)}
          thumb={state?.completeIcon as string}
          title={state?.completeTitle as string /*`Your staked ${stakingValue} BANK`*/}
        >
          {partialContent}
        </TransactionCompleteModal>
      )}
    </TransactionContext.Provider>
  )
}

export default TransactionProvider