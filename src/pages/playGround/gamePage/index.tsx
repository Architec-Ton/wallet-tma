import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  iconCoinButton,
  iconGlobalButton,
  iconSendButton,
} from '../../../assets/icons/buttons';
import Page from '../../../components/containers/Page';
import Tile from '../../../components/typography/Tile';
import { useGetGameQuery } from '../../../features/gaming/gamingApi';
import { setLoading } from '../../../features/page/pageSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

import classNames from 'classnames';
import { SwiperSlide } from 'swiper/react';
import Row from '../../../components/containers/Row';
import Section from '../../../components/containers/Section';
import Block from '../../../components/typography/Block';
import TypedTile from '../../../components/typography/TypedTile';
import Slider from '../../../components/ui/slider';
import useLanguage from '../../../hooks/useLanguage';
// import { GameResource } from '../../../types/gameTypes';

import LinkButton from '../../../components/buttons/LinkButton';
import './index.css';

const typedIcons = {
  website: iconGlobalButton,
  telegram: iconSendButton,
  jetton: iconCoinButton,
};

const GamePage = () => {
  const t = useLanguage('game');
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // const utils = useUtils();
  // const [walletInfoApi] = useApiWalletInfoMutation();
  // const navigate = useNavigate();
  const { data: game, isLoading } = useGetGameQuery(id as string);
  // const isTma = useAppSelector(selectIsTma);
  // const {data: leaders, isLoading: leadersIsLoading} = useGetGameLeadersQuery({id: id as string, limit: 3})

  const [readMoreDescription, setReacMoreDescription] =
    useState<boolean>(false);
  // const [assets, setAssets] = useState<CoinDto[]>()
  // const [isPinCode, setIsPinCode] = useState<boolean>(false)
  // const [isVoteModal, setIsVoteModal] = useState<boolean>(false)
  // const [showTransaction, setShowTransaction] = useState<boolean>(false);
  // const [showTransactionComplete, setShowTransactionComplete] =
  //   useState<boolean>(false);
  // const [isTransactionInProgress, setIsTransactionInProgress] =
  //   useState<boolean>(false);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);

  // useEffect(() => {
  //   walletInfoApi(null)
  //     .unwrap()
  //     .then((result: WalletInfoData) => {
  //       const { assets } = result.wallets[result.currentWallet];
  //       setAssets(assets);
  //     })
  //     .catch(() => {
  //       setAssets(initialAssets);
  //     });
  // }, []);

  const readMoreHandler = () => {
    setReacMoreDescription(!readMoreDescription);
  };
  /* TODO: раскомментировать после определения бекенда */
  // const seeAllHandler = () => {
  //   navigate(`/playground/${id}/leaders`)
  // }

  // const resourceHandler = useCallback(
  //   (resource: GameResource) => {
  //     return () => {
  //       const { url, type } = resource;
  //       if (isTma) {
  //         if (type === 'telegram') {
  //           utils.openTelegramLink(url);
  //         } else {
  //           utils.openLink(url);
  //         }
  //       } else {
  //         navigate(url);
  //       }
  //       console.log(url, type);
  //     };
  //   },
  //   [game]
  // );

  // const voteGameHandler = () => {
  //   setIsPinCode(true)
  //   setIsVoteModal(false)
  // }

  // const modalHandler = () => {
  //   setIsVoteModal(!isVoteModal)
  // }

  // const onPinSuccess = () => {
  //   setIsPinCode(false);
  //   setShowTransaction(true);
  // };

  // const delay = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(true);
  //     }, 10000);
  //   });
  // };

  // const transactionSuccessHandler = async () => {
  //   setIsTransactionInProgress(true);

  //   await delay();
  //   setIsTransactionInProgress(false);
  //   setShowTransaction(false);
  //   setShowTransactionComplete(true);  // };

  return (
    <Page>
      <Tile
        title={game?.title}
        description={game?.subtitle}
        icon={game?.icon}
        className="game-page__header">
        <div className="game-controls">
          <LinkButton
            className="primary-button primary-btn"
            to={game?.url || ''}>
            {t('play')}
          </LinkButton>

          {/* <button className="rounded-button vote-button" onClick={modalHandler}>
            <img src={iconLogoButton} alt="" />
            <span>350k+</span>
          </button> */}
        </div>
      </Tile>
      <Row className="w-screen">
        <Slider
          settings={{
            slidesPerView: 'auto',
            centeredSlides: false,
            spaceBetween: 0,
          }}
          className="list-swipe">
          {game?.gallery.map((url, index) => {
            return (
              <SwiperSlide key={`${url}-${index}`} className="gallery-slide">
                <img
                  src={url}
                  alt=""
                  className="game-gallery-img round-large"
                />
              </SwiperSlide>
            );
          })}
        </Slider>
      </Row>
      <Section
        title={t('description')}
        readMore={t('read-more')}
        readMoreHandle={readMoreHandler}>
        <Block>
          <div
            className={classNames('game-description__section', {
              all: readMoreDescription,
            })}>
            {game?.description}
          </div>
        </Block>
      </Section>
      {/* TODO: раскомментировать после определения бекенда */}
      {/* <Section title={t("leaderbord")} readMore={t("see-all")} readMoreHandle={seeAllHandler} className="leaders-section">
        <Grid columns={12} gap={2} className="game-leader__head" isOrderedList>
          <GameLeaderRow num="#" name={t("leader-name")} totalCoins={t("leader-total-coins")} asset={t("leader-asset")} time={t("leader-time")} isHeader />
        </Grid>
        {leaders && leaders.map((leader, index) => {
          return (
            <Grid key={`${leader.name}-${index}`} columns={12} gap={2} className="block game-leader__row" isOrderedList>
              <GameLeaderRow num={index + 1} name={leader.name} totalCoins={leader.totalCoins} asset={leader.asset} time={leader.time} />
            </Grid>
          )
        }) }
        <Grid columns={12} gap={2} className="block game-leader__row primary-block" isOrderedList>
          <GameLeaderRow num={12458} name="You" totalCoins="45678" asset="$PNK" time="12 H" />
        </Grid>
      </Section> */}
      {game?.resources && game.resources.length > 0 && (
        <Section title={t('project-resources')}>
          {game?.resources.map((resource) => {
            return (
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
            );
          })}
        </Section>
      )}
      {/* {isVoteModal && <VoteModal modalHandler={modalHandler} voteHandler={voteGameHandler} />}
      {isPinCode && <ModalPinCode onSuccess={onPinSuccess} mode="registration" />}
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
      )} */}
    </Page>
  );
};

export default GamePage;
