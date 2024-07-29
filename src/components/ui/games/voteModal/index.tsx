import Block from "../../../typography/Block"
import Modal from "../../modal"
import hearthImage from "../../../../assets/images/hearth.png"
import architecton from "../../../../assets/images/architecton.svg"

import "./index.css"
import Column from "../../../containers/Column"
import Row from "../../../containers/Row"
import { useState } from "react"

type OwnPropsType = {
  modalHandler: () => void
  voteHandler: () => void
}

const MIN_VOTE = 0
const MAX_VOTE = 5

const VoteModal = ({ modalHandler, voteHandler }: OwnPropsType) => {
  const [voteValue, setVoteValue] = useState<number>(0)

  const voteIncrement = () => {
    if (voteValue < MAX_VOTE) {
      setVoteValue(value => value + 1)
    }
  }
  const voteDecrement = () => {
    if (voteValue > MIN_VOTE) {
      setVoteValue(value => value - 1)
    }
  }

  return (
    <Modal onClose={modalHandler}>
      <Column className="vote-modal__content">
        <Block className="circle-block">
          <img src={hearthImage} alt="" />
        </Block>
        <Row className="vote-title">
          <div>Left your vote for</div>
          <img src={architecton} alt="" />
          <div>Architec.ton</div>
        </Row>
        <div className="vote-description">
        Every vote for Ton Punks will move him to the top of the list. All votes are reset at the end of 2024 <img src={hearthImage} alt="" /> 
        </div>
        <Row className="vote-form">
          <Block className="number-input">
            <Row className="number-counter__container">
                <button onClick={voteDecrement} disabled={voteValue <= MIN_VOTE}>-</button>
                <input type="number" value={voteValue} readOnly />
                <button onClick={voteIncrement} disabled={voteValue >= MAX_VOTE}>+</button>
            </Row>
          </Block>
          <button className="primary-button rounded-button grow" onClick={voteHandler} disabled={!voteValue}>Vote ~ 1 000 ARH</button>
        </Row>
      </Column>
    </Modal>
  )
}

export default VoteModal