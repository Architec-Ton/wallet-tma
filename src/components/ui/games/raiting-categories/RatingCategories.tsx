import React, {useState} from 'react';
import Tile from "components/typography/Tile.tsx";
import TileButton from "components/buttons/TileButton.tsx";
import arhcIcon from '../../../../assets/images/categories/base-categories/arch.svg'
import {addCircleIcon} from "assets/icons/buttons";
import './RatingCategories.style.css'
import Column from "components/containers/Column.tsx";
import NewCategory from "components/ui/games/raiting-categories/new-category/NewCategory.tsx";

const startNewRating = {
    icon: arhcIcon,
    title: 'Start a new rating...',
    iconAction: addCircleIcon
}

const RatingCategories = ({baseCategories, gameName}) => {
    const [isNewCategoryModal, setIsNewCategoryModal]= useState(false)

    const modalHandler = () => {
        setIsNewCategoryModal(!isNewCategoryModal)
    }

    return (
        <Column className="rating-categories-container">
        {baseCategories.map((category)=> {
            return (
                <div key={category.name}>
                    <Tile
                        icon={category.img}
                        title={category.name}
                        info={category.voiceQuantity}
                        style={{paddingLeft: 'var(--spacing-20)'}}
                        maxHeightIcon ='16px'
                    />
                </div>
            )
        })}
            <TileButton
                icon={startNewRating.icon}
                title={startNewRating.title}
                iconAction={startNewRating.iconAction}
                style={{width: '100%'}}
                onClick={modalHandler}
            />

            {isNewCategoryModal &&
                <NewCategory
                    modalHandler={modalHandler}
                    gameName={gameName}
                />
            }
        </Column>
    );
};

export default RatingCategories;