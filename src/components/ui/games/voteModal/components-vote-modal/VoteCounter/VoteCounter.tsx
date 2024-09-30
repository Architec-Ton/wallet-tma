import React from 'react';
import Block from "components/typography/Block.tsx";
import Row from "components/containers/Row.tsx";

const MIN_VOTE = 0;
const MAX_VOTE = 5;

const VoteCounter = ({setVoteValue, voteValue}) => {

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

    return (
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
    );
};

export default VoteCounter;