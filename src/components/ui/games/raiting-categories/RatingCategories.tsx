import React, {useState} from 'react';
import Tile from "components/typography/Tile.tsx";
import TileButton from "components/buttons/TileButton.tsx";
import arhcIcon from '../../../../assets/images/categories/base-categories/arch.svg'
import {addCircleIcon} from "assets/icons/buttons";
import './RatingCategories.style.css'
import Column from "components/containers/Column.tsx";
import NewCategory from "components/ui/games/raiting-categories/new-category/NewCategory.tsx";
import {archIcon} from "assets/images/categories/base-categories";

interface Props {
    baseCategories: [],
    gameName: string,
    rating: number,
}

const startNewRating = {
    icon: arhcIcon,
    title: 'Start a new rating...',
    iconAction: addCircleIcon,
}

const RatingCategories = ({baseCategories, gameName, rating}:Props) => {

    const [isNewCategoryModal, setIsNewCategoryModal]= useState(false)

    const modalHandler = () => {
        setIsNewCategoryModal(!isNewCategoryModal)
    }

    return (
        <Column className="rating-categories-container">
            <Tile
                icon={archIcon}
                title={'Overall Votes'}
                info={rating}
                style={{paddingLeft: 'var(--spacing-20)'}}
                maxHeightIcon ='16px'
            />
        {baseCategories.map((category)=> {
            return (
                <div key={category.name}>
                    <Tile
                        icon={category.img}
                        title={category.name}
                        info={category.voiceQuantity}
                        style={{
                            paddingLeft: 'var(--spacing-20)',
                            opacity: 0.5,
                            pointerEvents: 'none',
                            filter: 'grayscale(100%)',
                    }}
                        maxHeightIcon ='16px'
                    />
                </div>
            )
        })}
            <TileButton
                icon={startNewRating.icon}
                title={startNewRating.title}
                iconAction={startNewRating.iconAction}
                style={{
                    padding: '0px',
                    // width: '100%',
                    opacity: 0.5,
                    pointerEvents: 'none',
                    filter: 'grayscale(100%)',
            }}
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