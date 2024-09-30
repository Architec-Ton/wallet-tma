import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import classNames from "classnames";
import { selectAuthIsReady } from "features/auth/authSelector";
import {useGetGameLeadersQuery, useGetGameQuery} from "features/gaming/gamingApi";
import { setLoading } from "features/page/pageSlice";
import { SwiperSlide } from "swiper/react";

import {iconCoinButton, iconGameVote, iconGlobalButton, iconSendButton} from "assets/icons/buttons";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useLanguage from "hooks/useLanguage";

import LinkButton from "components/buttons/LinkButton";
import Page from "components/containers/Page";
import Row from "components/containers/Row";
import Section from "components/containers/Section";
import Block from "components/typography/Block";
import Tile from "components/typography/Tile";
import TypedTile from "components/typography/TypedTile";
import Tournament from "components/ui/games/tournament";
import Slider from "components/ui/slider";

import "./index.css";
import {WalletInfoData} from "types/wallet.ts";
import {CoinDto} from "types/assest.ts";
import {useApiWalletInfoMutation} from "features/wallet/walletApi.ts";
import {initialAssets} from "mocks/mockAssets.ts";
import TransactionModal from "components/ui/modals/transactionModal";
import ModalPinCode from "components/ui/modals/modalPinCode";
import VoteModal from "components/ui/games/voteModal";
import TransactionCompleteModal from "components/ui/modals/transactionCompleteModal";
import Button from "components/buttons/Button.tsx";

// import baseCategories from '../gamePage/test/base_categories.json'
import RatingCategories from "components/ui/games/raiting-categories/RatingCategories.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";


const typedIcons = {
  website: iconGlobalButton,
  telegram: iconSendButton,
  jetton: iconCoinButton,
};

const GamePage = () => {
  const t = useLanguage("game");
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [walletInfoApi] = useApiWalletInfoMutation();
  const isReady = useAppSelector(selectAuthIsReady);
  const { data: game, isLoading } = useGetGameQuery(id as string, { skip: !isReady });
  const {data: leaders, isLoading: leadersIsLoading} = useGetGameLeadersQuery({id: id as string, limit: 3})

  const baseCategories = useSelector((state: RootState) => state.rating);
  const [readMoreDescription, setReacMoreDescription] = useState<boolean>(false);
  const [assets, setAssets] = useState<CoinDto[]>()
  const [isPinCode, setIsPinCode] = useState<boolean>(false)
  const [isVoteModal, setIsVoteModal] = useState<boolean>(false)
  const [showTransaction, setShowTransaction] = useState<boolean>(false);
  const [showTransactionComplete, setShowTransactionComplete] =
    useState<boolean>(false);
  const [isTransactionInProgress, setIsTransactionInProgress] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    walletInfoApi(null)
      .unwrap()
      .then((result: WalletInfoData) => {
        const { assets } = result.wallets[result.currentWallet];
        setAssets(assets);
      })
      .catch(() => {
        setAssets(initialAssets);
      });
  }, []);

  const readMoreHandler = () => {
    setReacMoreDescription(!readMoreDescription);
  };

  const voteGameHandler = () => {
    setIsPinCode(true)
    setIsVoteModal(false)
  }

  const modalHandler = () => {
    setIsVoteModal(!isVoteModal)
  }

  const onPinSuccess = () => {
    setIsPinCode(false);
    setShowTransaction(true);
  };

  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 10000);
    });
  };

  const transactionSuccessHandler = async () => {
    setIsTransactionInProgress(true);

    await delay();
    setIsTransactionInProgress(false);
    setShowTransaction(false);
    setShowTransactionComplete(true);  };


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
          <LinkButton className="primary-button primary-btn" to={game?.url || ""}>
            {t("play")}
          </LinkButton>

          <Button
              style={{
                padding: "var(--spacing-8) var(--spacing-12)",
                gap: "var(--spacing-8)"
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
            slidesPerView: "auto",
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
      <Section title={t("description")} readMore={t("read-more")} readMoreHandle={readMoreHandler}>
        <Block>
          <div
            className={classNames("game-description__section", {
              all: readMoreDescription,
            })}
          >
            {game?.description}
          </div>
        </Block>
      </Section>
      {game?.resources && game.resources.length > 0 && (
        <Section title={t("project-resources")}>
          {game?.resources.map((resource) => (
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


      {/*todo после определения бэка поправить и сделать нормальную валидацию категорий*/}
      <Section title={t('rating')}>
        <RatingCategories
            baseCategories={baseCategories}
            gameName={game?.title}
        />
      </Section>

      {isVoteModal && <VoteModal
          modalHandler={modalHandler}
          voteHandler={voteGameHandler}
          gameName={game?.title}
          //todo после определения бэка убрать хардкод
          categories={baseCategories}
      />}

      {isPinCode && <ModalPinCode
          onSuccess={onPinSuccess}
          mode="registration"
      />}

      {showTransaction && (
        <TransactionModal
          from={assets && assets[0]}
          to={assets && assets[1]}
          sendedValue="1000"
          receivedValue="1000"
          commission={0.17}
          returnValue={0.125}
          address="jjsjsdljfsldkfj"
          transactionData={new Date()}
          transactionType={t('page-title')}
          onClose={() => setShowTransaction(false)}
          onSuccess={transactionSuccessHandler}
          inProgress={isTransactionInProgress}
        />
      )}
      {showTransactionComplete && (
        <TransactionCompleteModal
          onClose={() => setShowTransactionComplete(false)}
        />
      )}
    </Page>
  );
};

export default GamePage;
