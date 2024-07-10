import Column from "../../../containers/Column"
import Block from "../../../typography/Block"
import Modal from "../../modal"

import "./index.css"
import Section from "../../../containers/Section"

type TransactionCompleteModalProps = {
  onClose: () => void
  thumb: string
  children: React.ReactNode
  title: string
}

const TransactionCompleteModal = ({ onClose, thumb, title, children }: TransactionCompleteModalProps) => {
  return (
    <Modal onClose={onClose}>
      <Column className="complete-modal__content">
        <Block className="circle-block">
          <img src={thumb} alt="" />
        </Block>
        <Section title={title} className="complete-container">
          {children}
        </Section>
      </Column>
    </Modal>
  )
}

export default TransactionCompleteModal