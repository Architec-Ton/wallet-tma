import Column from "../../../containers/Column"
import Block from "../../../typography/Block"
import Modal from "../../modal"

import congratulateImg from "../../../../assets/images/congretulate.png"

import "./index.css"
import Section from "../../../containers/Section"
import { Link } from "react-router-dom"
import useLanguage from "../../../../hooks/useLanguage"

type TransactionCompleteModalProps = {
  onClose: () => void
}

const TransactionCompleteModal = ({ onClose }: TransactionCompleteModalProps) => {
  const t = useLanguage("transaction")
  return (
    <Modal onClose={onClose}>
      <Column className="complete-modal__content">
        <Block className="circle-block">
          <img src={congratulateImg} alt="" />
        </Block>
        <Section title={t("congratulation")} className="complete-container">
          <div>
            {t("complete-text")}
          </div>
          <Link to="/" className="primary-button rounded-button">{t("wallet-button")}</Link>
        </Section>
      </Column>
    </Modal>
  )
}

export default TransactionCompleteModal