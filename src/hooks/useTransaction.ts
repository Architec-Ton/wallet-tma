// import { useCallback, useContext, useEffect } from "react"
// import { TransactionContext } from "../components/layout/TransactionProvider"

// export const useTransaction = () => {
//   const transactionContext = useContext(TransactionContext)

//   useEffect(() => {
//     return () => {
//       transactionContext.destruct()
//     }
//   }, [])

//   const init = useCallback((params: any) => {
//     Object.keys(params).forEach((key) => {
//       transactionContext.setState(key, params[key])
//     })
//   }, [])

//   return {
//     init,
//     ...transactionContext
//   }
// }
