import React from 'react';

import Row from 'components/containers/Row.tsx';
import Block from 'components/typography/Block.tsx';

const VoteCounter = ({ setVoteValue, voteValue }) => {
    const voteIncrement = () => {
        setVoteValue(value => value + 1);
    };

    const voteDecrement = () => {
        if (voteValue > 0) {
            setVoteValue(value => value - 1);
        }
    };

    return (
        <Block className="number-input">
            <Row className="number-counter__container">
                <button onClick={voteDecrement} disabled={voteValue === 0}>
                    -
                </button>
                <div style={{display: 'flex', justifyContent: 'center', width: 'var(--spacing-32)' }}>{voteValue}</div>
                {/*<input type="number" value={voteValue} readOnly />*/}
                <button onClick={voteIncrement}>+</button>
            </Row>
        </Block>
    );
};

export default VoteCounter;
