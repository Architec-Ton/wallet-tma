// import { createContext, useState } from "react";
// import TransactionModal from "../ui/modals/transactionModal";
// import { CoinDto } from "../../types/assest";
// import TransactionCompleteModal from "../ui/modals/transactionCompleteModal";

// type ProviderStateType = {
//   from?: CoinDto | undefined;
//   to?: CoinDto | undefined;
//   sendedValue?: string;
//   receivedValue?: string;
//   commission?: number;
//   returnValue?: number;
//   address?: string;
//   transactionType?: string;
//   transactionData?: Date;
//   inProgress?: boolean;
//   tonUsdPrice?: number;
//   onSuccess?: () => Promise<void>;
//   completeIcon?: string;
//   completeTitle?: string;
// };

// type ProviderValuesType = {
//   open: () => void;
//   complete: () => void;
//   destruct: () => void;
//   setPartialContent: (c: React.ReactNode) => void;
//   setState: (k: string, v: any) => void;
//   state: ProviderStateType;
//   isOpen: boolean | undefined;
//   isComplete: boolean | undefined;
// };

// type TransactionHocPropsType = {
//   children: React.ReactNode;
// };

// export const TransactionContext = createContext<ProviderValuesType>({
//   open: () => {},
//   complete: () => {},
//   destruct: () => {},
//   setPartialContent: () => {},
//   setState: () => {},
//   state: {},
//   isOpen: false,
//   isComplete: false,
// });

// const TransactionProvider = ({ children }: TransactionHocPropsType) => {
//   const [isOpen, setIsOpen] = useState<boolean>();
//   const [isComplete, setIsComplete] = useState<boolean>();
//   // const [partialContent, setPartialContent] = useState<React.ReactNode>();
//   // const [isTransactionInProgress, setIsTransactionInProgress] =
//   //   useState<boolean>(true);

//   // TransactionProvider state params
//   const [state, setOwnState] = useState<ProviderStateType>({});

//   const openHandler = () => {
//     setIsOpen(true);
//   };

//   const completeHandler = () => {
//     setIsOpen(false);
//     setIsComplete(true);
//   };

//   // const onClose = () => {
//   //   setIsComplete(true);
//   //   setIsTransactionInProgress(false);
//   //   setIsOpen(false);
//   // };

//   const destruct = () => {
//     setIsOpen(false);
//     setIsComplete(false);
//   };

//   const setState = (key: string, value: any) => {
//     setOwnState((state) => {
//       return { ...state, [key]: value };
//     });
//   };

//   return (
//     <TransactionContext.Provider
//       value={{
//         open: openHandler,
//         complete: completeHandler,
//         destruct: destruct,
//         // setPartialContent,
//         setState,
//         isOpen,
//         isComplete,
//         state,
//       }}
//     >
//       {children}
//       {/* {isOpen && (
//         <TransactionModal
//           onClose={onClose}
//           // commission={state?.commission}
//           returnValue={state?.returnValue}
//           address={state?.address}
//           inProgress={isTransactionInProgress}
//         >{partialContent}</TransactionModal>
//       )}
//       {isComplete && (
//         <TransactionCompleteModal
//           onClose={() => setIsComplete(false)}
//           thumb={state?.completeIcon as string}
//           title={state?.completeTitle as string /*`Your staked ${stakingValue} BANK`*/}
//       {/* >
//           {partialContent}
//         </TransactionCompleteModal> */}
//     </TransactionContext.Provider>
//   );
// };

// export default TransactionProvider;
