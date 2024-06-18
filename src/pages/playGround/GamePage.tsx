import { Link, useNavigate, useParams } from "react-router-dom"
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
import Grid from "../../components/containers/Grid"
import GameLeaderRow from "./GameLeaderRow"

import './GamePage.style.css'

const typedIcons = {
  web: iconGlobalButton,
  telegram: iconSendButton,
  coin: iconCoinButton,
}

const GamePage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {data: game, isLoading} = useGetGameQuery(id as string)
  const {data: leaders, isLoading: leadersIsLoading} = useGetGameLeadersQuery({id: id as string, limit: 3})
  
  const [readMoreDescription, setReacMoreDescription] = useState<boolean>(false)

  useEffect(() => {
    dispatch(setLoading(isLoading || leadersIsLoading))
  }, [isLoading, leadersIsLoading])

  const starClickHandler = () => {
    // TODO: уточнить действие и поменять функционал
    console.log("star click")
  }

  const readMoreHandler = () => {
    setReacMoreDescription(!readMoreDescription)
  }

  const seeAllHandler = () => {
    navigate(`/playground/${id}/leaders`)
  }

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

  return (
    <Page>
      <Tile
        title={game?.title}
        description={game?.description}
        icon={game?.thumbnail}
        className="game-page__header"
      >
        <div className="game-controls">
          <Link to="" className="rounded-button">Play</Link>
          <img src={iconButtonMedalStars} alt="" onClick={starClickHandler} />
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
                <img src={url} alt="" />
              </SwiperSlide>
            )
          })}
        </Slider>
      </Row>
      <Section title="Description" readMore="Read All" readMoreHandle={readMoreHandler} >
          <Block className={classNames("game-description__section", { "all": readMoreDescription })}>
            {game?.description}
            Punk City introduces players to the CyberArena
            for intense PvP battles. With options for friendly
            duels or token-based confrontations, it features
            an advanced inventory system and a competitive weekly League. Beyond combat, the app offers daily token giveaways through tasks asdal asdd...
          </Block>
      </Section>
      <Section title="Leaderboard" readMore="See All" readMoreHandle={seeAllHandler} className="leaders-section">
        <Grid columns={12} gap={2} className="game-leader__head" isOrderedList>
          <GameLeaderRow num="#" name="Name" totalCoins="Total coins" asset="Asset" time="Time" isHeader />
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
      </Section>
      <Section title="Project Resources">
        {game?.resources.map(resource => {
          return (
            <TypedTile
              key={`${resource.type}-${game.id}`}
              icon={resource.thumbnail}
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