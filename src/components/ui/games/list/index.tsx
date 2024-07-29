import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { GameListItemType, GameListType } from '../../../../types/gameTypes';
import Column from '../../../containers/Column';
import Row from '../../../containers/Row';
import Slider from '../../slider';
import GameListItemGroup from '../listItemGroup';

import './index.css';
import useLanguage from '../../../../hooks/useLanguage';

type OwnPropsType = {
  games: GameListType<GameListItemType[]>;
};

function slideMatrix(arr: GameListItemType[], size: number) {
  const res = [];
  for (let i = 0; i < arr.length; i = i + size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

const GameList = ({ games }: OwnPropsType) => {
  const t = useLanguage('game');
  const [gameList, setGameList] = useState<GameListType<GameListItemType[][]>>(
    []
  );

  useEffect(() => {
    const list = games.reduce(
      (acc, game): GameListType<GameListItemType[][]> => {
        const { title, id, apps } = game;
        acc.push({
          title,
          id,
          apps: slideMatrix(apps as GameListItemType[], 3),
        });
        return acc;
      },
      [] as GameListType<GameListItemType[][]>
    );
    setGameList(list);
  }, [games]);

  return (
    <Column className="w-screen">
      {gameList.map((category) => category.apps.length > 0 && (
        <Column key={category.id}>
          <Row className="category-header">
            <div className="category-header__title">{category.title}</div>
            <Link
              to={`/playground/category/${category.id}`}
              className="category-header__all">
              {t('all')}
            </Link>
          </Row>
          <Column>
            <Slider
              settings={{
                slidesPerView: 'auto',
                centeredSlides: true,
                centeredSlidesBounds: true,
                spaceBetween: 0,
              }}
              className="list-swipe">
              {category.apps.map((itemsGroup, index) => {
                return (
                  <SwiperSlide
                    key={`game_slide-${category.id}-${index}`}
                    className="list-slide">
                    <GameListItemGroup group={itemsGroup} />
                  </SwiperSlide>
                );
              })}
            </Slider>
          </Column>
        </Column>
      ))}
    </Column>
  );
};

export default GameList;
