import React from "react";

import Modal from "../../modal";
import GameListFilter from "../filter";

type OwnPropsType = {
  modalHandler: () => void;
};

const GameFilterModal = ({ modalHandler }: OwnPropsType) => (
  <Modal title="Filter settings" onClose={modalHandler}>
    <GameListFilter />
  </Modal>
);

export default GameFilterModal;
