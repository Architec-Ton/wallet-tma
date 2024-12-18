import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import classNames from 'classnames';
import { selectAuthIsReady } from 'features/auth/authSelector';
import { useGetGameQuery, useVoteTxnMutation } from 'features/gaming/gamingApi';
import { setLoading } from 'features/page/pageSlice';
import { SwiperSlide } from 'swiper/react';
import { iconCoinButton, iconGameVote, iconGlobalButton, iconSendButton } from 'assets/icons/buttons';
import { useAppDispatch, useAppSelector } from 'hooks/useAppDispatch';
import useLanguage from 'hooks/useLanguage';
import Button from 'components/buttons/Button.tsx';
import LinkButton from 'components/buttons/LinkButton';
import Page from 'components/containers/Page';
import Row from 'components/containers/Row';
import Section from 'components/containers/Section';
import Block from 'components/typography/Block';
import Tile from 'components/typography/Tile';
import TypedTile from 'components/typography/TypedTile';
import RatingCategories from 'components/ui/games/raiting-categories/RatingCategories.tsx';
import Tournament from 'components/ui/games/tournament';
import VoteModal from 'components/ui/games/voteModal';
import Slider from 'components/ui/slider';

import type { RootState } from '../../../store';
import './index.css';
import {Cell} from "@ton/core";
import {useTon} from "hooks/useTon";

const typedIcons = {
  website: iconGlobalButton,
  telegram: iconSendButton,
  jetton: iconCoinButton,
};

const GamePage = () => {
  const t = useLanguage('game');
  const ton = useTon();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isReady = useAppSelector(selectAuthIsReady);
  const { data: game, isLoading } = useGetGameQuery(id as string, { skip: !isReady });
  const [voteTxnMutation, { isLoading: isVoting, isSuccess, isError }] = useVoteTxnMutation();
  const baseCategories = useSelector((state: RootState) => state.rating);
  const [readMoreDescription, setReacMoreDescription] = useState<boolean>(false);
  const [isVoteModal, setIsVoteModal] = useState<boolean>(false);
  const [voteValue, setVoteValue] = useState<number>(0);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);


  const readMoreHandler = () => {
    setReacMoreDescription(!readMoreDescription);
  };

    const voteGameHandler = async () => {
        try {
            const result = await voteTxnMutation({
                appId: id as string,
                amount: voteValue as number,
                comment: '',
            }).unwrap();

            if (isSuccess) {
                console.log('success');

                const body = Cell.fromBase64(result.body);
                console.log(body)
                await ton.sender.send({
                    value: BigInt(result.value),
                    to: result.to,
                    body: body,
                    sendMode: result.mode,
                });
                setIsVoteModal(false);
            }
        } catch (error) {
            console.error('Vote transaction failed', error);
        }
    };


    const modalHandler = () => {
        setIsVoteModal(!isVoteModal);
    };

  return (
      <Page>
        <Tile
            title={game?.title}
            description={game?.subtitle}
            icon={game?.icon}
            isVerified={!!game?.isPartner}
            className="game-page__header"
        >
          <div className="game-controls">
            <Row>
              <LinkButton className="primary-button primary-btn" to={game?.url || ''}>
                {t('play')}
              </LinkButton>

              <Button
                  style={{
                    padding: 'var(--spacing-8) var(--spacing-12)',
                    gap: 'var(--spacing-8)',
                  }}
                  onClick={modalHandler}
                  primary={false}
                  icon={iconGameVote}
                  title={t('vote-button')}
              />
            </Row>
          </div>
        </Tile>
        <Row className="w-screen">
          <Slider
              settings={{
                slidesPerView: 'auto',
                centeredSlides: false,
                spaceBetween: 0,
              }}
              className="list-swipe"
          >
            {game?.gallery.map((url, index) => (
                <SwiperSlide key={`${url}-${index}`} className="gallery-slide">
                  <img src={url} alt="" className="game-gallery-img round-large" />
                </SwiperSlide>
            ))}
          </Slider>
        </Row>
        <Tournament id={game?.id} />
        <Section title={t('description')} readMore={t('read-more')} readMoreHandle={readMoreHandler}>
          <Block>
            <div
                className={classNames('game-description__section', {
                  all: readMoreDescription,
                })}
            >
              {game?.description}
            </div>
          </Block>
        </Section>
        {game?.resources && game.resources.length > 0 && (
            <Section title={t('project-resources')}>
              {game?.resources.map(resource => (
                  <LinkButton to={resource.url} key={resource.url}>
                    <TypedTile
                        key={`${resource.type}-${game.id}`}
                        icon={resource.icon}
                        typeIcon={typedIcons[resource.type]}
                        title={resource.type}
                        description={resource.title}
                        // link={resource.url}
                        className="game-resource__block telegram"
                        // onClick={resourceHandler(resource)}
                    />
                  </LinkButton>
              ))}
            </Section>
        )}

        <Section title={t('rating')}>
          <RatingCategories
              baseCategories={baseCategories}
              gameName={game?.title}
              rating={game?.ratings?.numberOfVotes}
          />
        </Section>

        {isVoteModal && (
            <VoteModal
                setVoteValue={setVoteValue}
                voteValue={voteValue}
                modalHandler={modalHandler}
                voteHandler={voteGameHandler}
                gameName={game?.title}
                categories={baseCategories}
            />
        )}
       </Page>
  );
};

export default GamePage;
