import { iconGlobalButton } from "../../../../assets/icons/buttons"
import { iconTon, iconUsdt } from "../../../../assets/icons/jettons"
import useLanguage from "../../../../hooks/useLanguage"
import { CoinDto } from "../../../../types/assest"
import Column from "../../../containers/Column"
import Row from "../../../containers/Row"
import ListBlock from "../../listBlock"
import ListBaseItem from "../../listBlock/ListBaseItem"
import Modal from "../../modal"

import "./index.css"

type TransactionModalPropsType = {
  onClose: () => void
  onSuccess: () => void
  from: CoinDto | undefined
  to: CoinDto | undefined
  sendedValue: string 
  receivedValue: string
  commission: number
  returnValue: number
  address: string
  transactionType: string
  transactionData: Date
}

const TransactionModal = ({ 
  onClose,
  onSuccess,
  from,
  to,
  sendedValue,
  receivedValue,
  commission,
  returnValue,
  address,
  transactionType,
  transactionData
}: TransactionModalPropsType) => {
  const t = useLanguage("transaction")

  return (
    <Modal onClose={onClose}>
      <Column className="transaction-data">
        <Row className="transaction-assets">
          <img src={from?.meta?.image} alt="" />
          <img src={to?.meta?.image} alt="" />
        </Row>
        <div className="">-{sendedValue} {from?.meta?.symbol}</div>
        <div className="">+{receivedValue} {to?.meta?.symbol}</div>
        <div className="secondary-data">{Number(receivedValue) * Number(to?.usdPrice)} $</div>
        <div className="secondary-data">{transactionType} {transactionData?.toLocaleString()}</div>
        <div className="process">
          <img src="" alt="" className="inline-loader" />
          <div>{t("loading")}</div>
        </div>
      </Column>
      <ListBlock className="transaction-info__list">
        <ListBaseItem>
          <Column className="receiver-address">
            <div>{t("receiver-address")}</div>
            <span>{address}</span>
          </Column>
        </ListBaseItem>
        <ListBaseItem>
          <div>{t("commission")}</div>
          <Column className="transaction-info">
            <div>{commission} TON</div>
            <div className="secondary-info">$ {commission * Number(from?.usdPrice)}</div>
          </Column>
        </ListBaseItem>
        <ListBaseItem>
          <div>{t("return")}</div>
          <Column className="transaction-info">
            <div>{returnValue} TON</div>
            <div className="secondary-info">$ {returnValue * Number(from?.usdPrice)}</div>
          </Column>
        </ListBaseItem>
        <ListBaseItem>
          <div>{t("comment")}</div>
          <div>{t("finish")}</div>
        </ListBaseItem>
      </ListBlock>
      <button className="rounded-button control-button transaction-button" onClick={onSuccess}>
        <Row>
          <img src={iconGlobalButton} alt="" />
          <span>{t("page-title")}</span>
        </Row>
      </button>
    </Modal>
  )
}

export default TransactionModal