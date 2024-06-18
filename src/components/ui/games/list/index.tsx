
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { GameListItemType, GameListType } from '../../../../types/gameTypes';
import Column from '../../../containers/Column';
import Row from '../../../containers/Row';
import Slider from '../../slider';
import GameListItemGroup from '../listItemGroup';

import './index.css'

type OwnPropsType = {
  games: GameListType<GameListItemType[]>
}


function slideMatrix(arr: GameListItemType[], size: number) {
  var res = [] 
  for(let i = 0; i < arr.length; i = i + size) {
    res.push(arr.slice(i, i + size))
  }
  return res
}

const GameList = ({ games }: OwnPropsType) => {

  const [gameList, setGameList] = useState<GameListType<GameListItemType[][]>>([])

  useEffect(() => {
    const list = games.reduce((acc, game): GameListType<GameListItemType[][]> => {
      const {title, id, items} = game
      acc.push({
        title,
        id,
        items: slideMatrix(items as GameListItemType[], 3)
      })
      return acc
    }, [] as GameListType<GameListItemType[][]>)
    setGameList(list)
  }, [])

  return (
    <Column className="w-screen">
      {gameList.map((category) => (
        <Column key={category.id}>
          <Row className="category-header">
            <div className="category-header__title">{category.title}</div>
            <Link to="" className="category-header__all">All</Link>
          </Row>
          <Column>
            <Slider settings={{
              slidesPerView: "auto",
              centeredSlides: true,
              centeredSlidesBounds: true,
              spaceBetween: 0
            }}  className="list-swipe">
              {category.items.map((itemsGroup, index) => {
                return (
                  <SwiperSlide key={`game_slide-${category.id}-${index}`} className="list-slide">
                    <GameListItemGroup group={itemsGroup} />
                  </SwiperSlide>
                )
              })}
            </Slider>
          </Column>
        </Column>
      ))}
    </Column>
  )
}

export default GameList