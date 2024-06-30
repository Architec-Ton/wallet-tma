import Modal from "../../modal"

type TransactionModalPropsType = {
  onClose: () => void
}

const TransactionModal = ({ onClose }: TransactionModalPropsType) => {
  return (
    <Modal onClose={onClose}>
      Transaction modal
    </Modal>
  )
}

export default TransactionModal