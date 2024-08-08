import Modal from "../../modal";
import GameListFilter from "../filter";

type OwnPropsType = {
  modalHandler: () => void;
};

const GameFilterModal = ({ modalHandler }: OwnPropsType) => {
  return (
    <Modal title="Filter settings" onClose={modalHandler}>
      <GameListFilter />
    </Modal>
  );
};

export default GameFilterModal;
