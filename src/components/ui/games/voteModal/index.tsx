import React, {useEffect, useState} from "react";

import voteImage from "assets/images/voteImage.png"
import Column from "components/containers/Column";
import Row from "components/containers/Row";
import Block from "components/typography/Block";

import Modal from "../../modal";
import "./index.css";
import {useTmaMainButton} from "hooks/useTma.ts";
import useLanguage from "hooks/useLanguage.ts";
import Selector from "components/selector/Selector.tsx";
import FormatMessage from "components/typography/FormatMessage.tsx";


const categories = [
  { value: 'option1'},
  { value: 'option2'},
  { value: 'option3'},
  { value: 'option4'},
  { value: 'option5'},
  { value: 'option6 out option6 in option6 '},
];


type OwnPropsType = {
  modalHandler: () => void;
  voteHandler: () => void;
  gameName: string;
};

const MIN_VOTE = 0;
const MAX_VOTE = 5;

const VoteModal = ({ modalHandler, voteHandler, gameName }: OwnPropsType) => {
  const [voteValue, setVoteValue] = useState<number>(0);
  const t = useLanguage('vote-modal')
  const mainButton = useTmaMainButton()


  const voteIncrement = () => {
    if (voteValue < MAX_VOTE) {
      setVoteValue((value) => value + 1);
    }
  };

  const voteDecrement = () => {
    if (voteValue > MIN_VOTE) {
      setVoteValue((value) => value - 1);
    }
  };

  useEffect(() => {
    const votePrise = 1000
    mainButton.init(
        `${t('vote')} ~${votePrise * voteValue} ARH`,
        ()=> voteHandler,
        voteValue !== 0
    )
  }, [voteValue]);


  return (
    <Modal onClose={modalHandler}>
      <Column className="vote-modal__content">

        <Block className="circle-block">
          <img src={voteImage} alt="" />
        </Block>

        <Row className="vote-title">
          <div>
            <h1>{t('title')}</h1>
          </div>
        </Row>

        <div className="vote-description-container">
          <div className="vote-description-part1">
            {t('description')}
          </div>
          <div className="vote-description-part2">
            <FormatMessage components={{ span: <span/> }}>
              {t('project',undefined, {gameName: gameName})}
            </FormatMessage>
          </div>
        </div>

        <Row className="vote-form">
          {/*//todo выделить в отдельный компонент*/}
          <Block className="number-input">
            <Row className="number-counter__container">
              <button onClick={voteDecrement} disabled={voteValue <= MIN_VOTE}>
                -
              </button>
              <input type="number" value={voteValue} readOnly />
              <button onClick={voteIncrement} disabled={voteValue >= MAX_VOTE}>
                +
              </button>
            </Row>
          </Block>

          <Selector options={categories}/>

        </Row>
      </Column>
    </Modal>
  );
};

export default VoteModal;
