import React, {useEffect, useState} from "react";

import voteImage from "assets/images/voteImage.png"
import selectCategoryImg from "assets/images/selectCategory.png"
import Column from "components/containers/Column";
import Row from "components/containers/Row";

import Modal from "../../modal";
import "./index.css";
import {useTmaMainButton} from "hooks/useTma.ts";
import useLanguage from "hooks/useLanguage.ts";
import VoteCategorySelector from "components/ui/games/voteModal/components-vote-modal/vote-category-selector/VoteCategorySelector.tsx";
import FormatMessage from "components/typography/FormatMessage.tsx";
import VoteCounter from "components/ui/games/voteModal/components-vote-modal/VoteCounter/VoteCounter.tsx";
import selectorSwitch from '../../../../assets/images/categories/selectorSwitch.svg'
import selectorSwitchCheck from '../../../../assets/images/categories/selectorSwitchCheck.svg'
import ListBaseItem from "components/ui/listBlock/ListBaseItem.tsx";
import ListBlock from "components/ui/listBlock";


type OwnPropsType = {
  modalHandler: () => void;
  voteHandler: () => void;
  gameName: string;
  categories: [];
};

const VoteModal = ({ modalHandler, voteHandler, gameName, categories }: OwnPropsType) => {
  const [voteValue, setVoteValue] = useState<number>(0);
  const t = useLanguage('vote-modal')
  const mainButton = useTmaMainButton()
  const [currentStep, setCurrentStep] = useState<string>('vote');
  const [selectedCategory, setSelectedCategory] = useState<string>(categories.length > 0 ? categories[1].name : '');

  const voteAmount = 1000 * voteValue

  const setStepCategorySelector=()=> {
    setCurrentStep('categorySelector')
  }

  const setStepConfirmVote = ()=> {
    setCurrentStep('confirmVotes')
  }

  const setStepVote = ()=> {
    setCurrentStep('vote')
  }

  const setCategory = (category) => {
    setSelectedCategory(category.name);

  }

  const baseCategories = categories.slice(1)

  const stepsConfig = {

    vote: {
      image: voteImage,
      title: t('title'),
      description: (
          <div>
            <div className="vote-description-part1">
              {t('description')}
            </div>
            <div className="vote-description-part2">
              <FormatMessage components={{ span: <span/> }}>
                {t('project',undefined, {gameName: gameName})}
              </FormatMessage>
            </div>
          </div>
      ),
      mainButtonConf: {
        titleMB: `${t('vote')} ~${voteAmount} ARH`,
        onClickMB: setStepConfirmVote,
        visibleMB: voteValue !== 0
      },
      content: (
          <Row className="vote-form">
            <VoteCounter
                setVoteValue={setVoteValue}
                voteValue={voteValue}
            />
            <VoteCategorySelector
                options={categories}
                selectedCategory={selectedCategory}
                setStepCategorySelector={setStepCategorySelector}
            />
          </Row>
      )
    },

    categorySelector: {
      image: selectCategoryImg,
      title: t('title-select-category'),
      description: t('description-select-category'),
      mainButtonConf: {
        titleMB: t('mainbutton-text-select-category'),
        onClickMB: setStepVote,
        visibleMB: true
      },
      content: (
          <ListBlock>
            {baseCategories.map((category, index)=> {
              return (
                <ListBaseItem className="vote-selector-categories-container">
                  <Row key={index} onClick={() => setCategory(category)}>
                    <div className="vote-selector-categories-switch">
                      {selectedCategory === category.name
                          ? <img src={selectorSwitchCheck} alt=""/>
                          : <img src={selectorSwitch} alt=""/>
                      }
                    </div>
                    <div className="vote-selector-categories-name">
                      {category.name}
                    </div>
                    <div className="vote-selector-categories-description">
                      — {category.description}
                    </div>
                  </Row>
                </ListBaseItem>
              );
            })}
          </ListBlock>
      ),
    },

    confirmVotes: {
      image: voteImage,
      title: (
          <div style={{display: 'flex', flexDirection: 'row', gap: 'var(--spacing-8)'}}>
              <FormatMessage components={{ div: <div/> }}>
                  {voteValue > 1
                      ? t('confirm-titles',undefined, {votes: voteValue})
                      : t('confirm-title',undefined, {votes: voteValue})
                  }
              </FormatMessage>
          </div>
      ),
      description: '',
      mainButtonConf: {
        titleMB: t('confirm-mainbutton-text'),
        onClickMB: voteHandler,
        visibleMB: true
      },
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
                      {t('confirm-category')}
                  </div>
                  <div>
                      {selectedCategory}
                  </div>
              </ListBaseItem>
              <ListBaseItem>
                  <div>
                      {t('confirm-number-of-votes')}
                  </div>
                  <div>
                      {voteValue}
                  </div>
              </ListBaseItem>
              <ListBaseItem>
                  <div>
                      {t('confirm-amount')}
                  </div>
                  <div>
                      {voteAmount} $ARC
                  </div>
              </ListBaseItem>
              <ListBaseItem>
                  <div>
                      {t('confirm-gas')}
                  </div>
                  <div>
                     ~ {'0,0512'} TON
                  </div>
              </ListBaseItem>
          </ListBlock>
      ),
    }
  }

  const { image, title, description, content, mainButtonConf } = stepsConfig[currentStep];

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
      <Column className="vote-modal__content">

        <div className="circle-block">
          <img src={image} alt=""/>
        </div>

        <Row className="vote-title">
          <div>
            <h1>{title}</h1>
          </div>
        </Row>


        <div className="vote-description-container">
          {description}
        </div>

        {content}
      </Column>
    </Modal>
  );
};

export default VoteModal;
