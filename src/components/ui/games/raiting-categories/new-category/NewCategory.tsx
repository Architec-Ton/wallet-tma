import React, {useEffect, useState} from 'react';
import './NewCategory.style.css'
import Modal from "components/ui/modal";
import {useDispatch} from "react-redux";
import {newCategory} from "features/rating/ratingSlice.ts";
import {useTmaMainButton} from "hooks/useTma.ts";
import useLanguage from "hooks/useLanguage.ts";
import {
    customCategoriesImges
} from '../../../../../assets/images/categories/custom-categories/index.ts'
import Row from "components/containers/Row.tsx";
import Column from "components/containers/Column.tsx";
import FormatMessage from "components/typography/FormatMessage.tsx";
import Tile from "components/typography/Tile.tsx";
import Input from "components/inputs/Input.tsx";
import Grid from "components/containers/Grid.tsx";
import {selectButtonLeft, selectButtonRight} from "assets/icons/buttons";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem.tsx";



const NewCategory = ({modalHandler, gameName}) => {

    const dispatch = useDispatch();
    const t = useLanguage('new-category-modal')
    const [currentStep, setCurrentStep] = useState<string>('newCategory');
    const [name, setName]=useState<string>('')
    const [description, setDescription]=useState<string>('')
    const [imgIndex, setImgIndex]=useState<number>(0)
    const mainButton = useTmaMainButton()

    const newCategoryDataToSend = {
        img: customCategoriesImges[imgIndex],
        name: name,
        description: description,
        voiceQuantity: '100'
    }

    const sendNewCategoryData = () => {
        dispatch(newCategory(newCategoryDataToSend))
        modalHandler()
    }

    const setConfirmNewCategory = () => {
        setCurrentStep('confirmNewCategory')
    }

    const nextImg =() => {
        if (imgIndex === customCategoriesImges.length-1) {
            setImgIndex(0)
        } else {setImgIndex(imgIndex+1)}
    }

    const privImg =() => {
        if (imgIndex === 0) {
            setImgIndex(customCategoriesImges.length-1)
        } else {setImgIndex(imgIndex-1)}
    }

    const inputNameHandler= (e) => {
        setName(e.target.value)
    }

    const inputDescriptionfHandler= (e) => {
        setDescription(e.target.value)
    }

    const modalConf = {
        newCategory: {
            isImgSelectable: true,
            descriptionConf: (
                <FormatMessage components={{ span: <span/> }}>
                    {t('description-text',undefined, {gameName: gameName})}
                </FormatMessage>
            ),
            content: (
                <Column>
                    <Grid
                        rows={1}
                        columns={2}
                        templateColumns='1fr 1.5fr'
                        columnGap={'var(--spacing-8)'}
                    >
                        <Tile
                            title={t('category-name')}
                        />
                        <Input
                            placeholder={t('category-name-placeholder')}
                            onChange={inputNameHandler}
                        />
                    </Grid>

                    <Grid
                        rows={1}
                        columns={2}
                        templateColumns='1fr 1.5fr'
                        columnGap={'var(--spacing-8)'}
                    >
                        <Tile
                            title={t('category-description')}
                        />
                        <Input
                            placeholder={t('category-description-placeholder')}
                            onChange={inputDescriptionfHandler}
                        />
                    </Grid>
                </Column>
            ),
            mainButtonConf: {
                titleMB: `${t('mainbutton-text')} ~1000 ARH`,
                onClickMB: setConfirmNewCategory,
                visibleMB: true
            }
        },
        confirmNewCategory: {
            isImgSelectable: false,
            descriptionConf: '',
            content: (
                <ListBlock>
                    <ListBaseItem>
                        <div>
                            {t('confirm-project')}
                        </div>
                        <span>
                            {gameName}
                        </span>
                    </ListBaseItem>
                    <ListBaseItem>
                        <div>
                            {t('confirm-category-name')}
                        </div>
                        <div>
                            {name}
                        </div>
                    </ListBaseItem>
                    <ListBaseItem>
                        <div>
                            {t('confirm-amount')}
                        </div>
                        <div>
                            1 000 $ARC
                        </div>
                    </ListBaseItem>
                    <ListBaseItem>
                        <div>
                            {t('confirm-gas')}
                        </div>
                        <div>
                            ~ 0,051235 TON
                        </div>
                    </ListBaseItem>
                </ListBlock>
            ),
            mainButtonConf: {
                titleMB: t('confirm-mainbutton-text'),
                onClickMB: sendNewCategoryData,
                visibleMB: true
            }
        }
    }


    const {isImgSelectable, descriptionConf, content, mainButtonConf} = modalConf[currentStep]

    useEffect(() => {
        const{titleMB, onClickMB, visibleMB} = mainButtonConf
        mainButton.init(
            titleMB,
            onClickMB,
            visibleMB
        )
    }, [mainButtonConf]);

    return (
        <Modal onClose={modalHandler}>
            <Column className="new-category-modal__content">

                <Row>
                    {isImgSelectable &&
                        <button className='new-category-select-button' onClick={privImg}>
                            <img src={selectButtonLeft} alt=""/>
                        </button>
                    }

                    <div className="new-category-circle-block">
                        <img src={customCategoriesImges[imgIndex]} alt=""/>
                    </div>

                    {isImgSelectable &&
                        <button className='new-category-select-button' onClick={nextImg}>
                            <img src={selectButtonRight} alt=""/>
                        </button>
                    }
                </Row>

                <Row className="new-category-title">
                    <div>
                        <h1>{t('title')}</h1>
                    </div>
                </Row>

                <div className="new-category-description-container">
                    {descriptionConf}
                </div>

                {content}
            </Column>
        </Modal>
    );
};

export default NewCategory;