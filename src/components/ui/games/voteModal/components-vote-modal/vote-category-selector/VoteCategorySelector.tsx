import React from 'react';
import './VoteCategorySelector.style.css';
import Block from "components/typography/Block.tsx";
import {iconButtonTwoArrows} from 'assets/icons/buttons';

const VoteCategorySelector = ({selectedCategory, setStepCategorySelector}) => {

    return (
        <Block
            className="custom-select"
            onClick={setStepCategorySelector}
        >
            <div>
                <div className="custom-select-trigger">
                    <div className={'selected-option'}>
                        {selectedCategory}
                    </div>
                    <button className='arrow'>
                        <img src={iconButtonTwoArrows} alt=""/>
                    </button>
                </div>
            </div>
        </Block>
    );
};

export default VoteCategorySelector;

