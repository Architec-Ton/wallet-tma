import { useNavigate, useParams } from "react-router-dom"
import Page from "../../components/containers/Page"
import { useGetGameLeadersQuery, useGetGameQuery } from "../../features/gaming/gamingApi"
import { useCallback, useEffect, useState } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setLoading } from "../../features/page/pageSlice"
import Tile from "../../components/typography/Tile"
import { iconButtonMedalStars, iconCoinButton, iconGlobalButton, iconSendButton } from "../../assets/icons/buttons"

import Slider from "../../components/ui/slider"
import { SwiperSlide } from "swiper/react"
import Row from "../../components/containers/Row"
import Section from "../../components/containers/Section"
import Block from "../../components/typography/Block"
import classNames from "classnames"
import TypedTile from "../../components/typography/TypedTile"
import { GameResource } from "../../types/gameTypes"
import useLocalStorage from "../../hooks/useLocalStorage"
import useLanguage from "../../hooks/useLanguage"

import './GamePage.style.css'

const typedIcons = {
  web: iconGlobalButton,
  telegram: iconSendButton,
  coin: iconCoinButton,
}

const GamePage = () => {
  const t = useLanguage("game")
  const { id } = useParams()
  const [favorites, setFavorites] = useLocalStorage<(number | string)[]>("game_favorites", [])
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  const {data: game, isLoading} = useGetGameQuery(id as string)
  // const {data: leaders, isLoading: leadersIsLoading} = useGetGameLeadersQuery({id: id as string, limit: 3})
  
  const [readMoreDescription, setReacMoreDescription] = useState<boolean>(false)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading])

  useEffect(() => {
    if (game) {
      const isInFavorites = favorites.includes(game.id as never)
      setIsFavorite(isInFavorites)
    }
  }, [game, favorites])

  const readMoreHandler = () => {
    setReacMoreDescription(!readMoreDescription)
  }
  /* TODO: раскомментировать после определения бекенда */
  // const seeAllHandler = () => {
  //   navigate(`/playground/${id}/leaders`)
  // }

  const resourceHandler = useCallback((resource: GameResource) => {
    return () => {
      const { link, type } = resource
      /**
       * if (type === 'telegram') { WebApp.openTelegramLink(link) }
       * else { WebApp.openLink(link) }
       */
      console.log(link, type)
    }
  }, [game])

  const addToFavorites = () => {
    if (!game) {
      return
    }
    if (isFavorite) {
      const filterdFavorites = favorites.filter(favorite => favorite !== game.id)
      setFavorites(filterdFavorites)
    } else {
      const newFavorites = [...favorites, game.id]
      setFavorites(newFavorites)
    }
  }

  return (
    <Page>
      <Tile
        title={game?.title}
        description={game?.description}
        icon={game?.thumb}
        className="game-page__header"
      >
        <div className="game-controls">
          <button className="rounded-button primary-button">{t("play")}</button>
          <img src={iconButtonMedalStars} alt="" onClick={addToFavorites} />
        </div>
      </Tile>
      <Row className="w-screen">
        <Slider settings={{
          slidesPerView: "auto",
          centeredSlides: false,
          spaceBetween: 0
        }} className="list-swipe">
          {game?.album.map((url, index) => {
            return (
              <SwiperSlide key={`${url}-${index}`} className="album-slide">
                <img src={url} alt="" className="round-large" />
              </SwiperSlide>
            )
          })}
        </Slider>
      </Row>
      <Section title={t("description")} readMore={t("read-more")} readMoreHandle={readMoreHandler} >
          <Block>
            <div className={classNames("game-description__section", { "all": readMoreDescription })}>
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
      <Section title={t("project-resources")}>
        {game?.resources.map(resource => {
          return (
            <TypedTile
              key={`${resource.type}-${game.id}`}
              icon={resource.thumb}
              typeIcon={typedIcons[resource.type]}
              title={resource.title}
              description={resource.description}
              link={resource.link}
              className="game-resource__block telegram"
              onClick={resourceHandler(resource)}
            />
          )
        })}
          
      </Section>
    </Page>
  )
}

export default GamePage