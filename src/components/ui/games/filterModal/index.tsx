import GameListFilter from "../filter"
import Modal from "../../modal"

type OwnPropsType = {
  modalHandler: () => void
}

const GameFilterModal = ({ modalHandler }: OwnPropsType) => {
  return (
    <Modal title="Filter settings" onClose={modalHandler}>
      <GameListFilter />
    </Modal>
  )
}

export default GameFilterModal
