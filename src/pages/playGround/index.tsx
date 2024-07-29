import Column from '../../components/containers/Column.tsx';
import Page from '../../components/containers/Page.tsx';
import { useEffect, useState } from 'react';
import Row from '../../components/containers/Row.tsx';
import Slider from '../../components/ui/slider';
import { SwiperSlide } from 'swiper/react';
import GameList from '../../components/ui/games/list';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch.ts';
import {
  selectGames,
  selectGamesFilter,
} from '../../features/gaming/gamingSelectors.ts';
import SearchBar from '../../components/ui/searchBar';
import Tabs from '../../components/ui/tabs';
import Tab from '../../components/ui/tabs/Tab.tsx';
import {
  useGetCategoriesMutation,
  useGetTopRateGamesMutation,
} from '../../features/gaming/gamingApi.ts';
import TopRate from '../../components/ui/games/topRate';
import useDebounce from '../../hooks/useDebounce.ts';
import { AppsList, GameFilterType } from '../../types/gameTypes.ts';
import { clearFilter } from '../../features/gaming/gamingSlice.ts';

import './index.css';
import useLanguage from '../../hooks/useLanguage.ts';
import { usePage } from '../../hooks/usePage.ts';
import { Link } from 'react-router-dom';

type SearchParamsType = {
  direction?: string;
  order?: string;
  search?: string;
};
type SerchParamsKeys = keyof SearchParamsType;
type FilterKeys = keyof GameFilterType;

function PlayGround() {
  const dispatch = useAppDispatch();
  const debounce = useDebounce();
  const t = useLanguage('game');
  const page = usePage();
  const games = useAppSelector(selectGames);
  const filter = useAppSelector(selectGamesFilter);
  const [isTopView, setIsTopView] = useState<boolean>(false);
  const [isCategoryView, setIsCategoryView] = useState<boolean>(true);
  const [getCategories, { isLoading }] = useGetCategoriesMutation();
  const [getTopGames, { data: topGames, isLoading: isTopGamesLoading }] =
    useGetTopRateGamesMutation();
  const [searchParams, setSearchParams] = useState<SearchParamsType>();
  const [isSearchParamsChanged, setIsSearchParamsChanged] =
    useState<boolean>(false);
  const [filteredGames, setFilteredGames] = useState<AppsList | null>()

  useEffect(() => {
    getCategories(undefined);
    getTopGames(undefined);

    return () => {
      dispatch(clearFilter());
    };
  }, []);

  useEffect(() => {
    if (games) {
      setFilteredGames(games)
    }
  }, [games])

  useEffect(() => {
    if (isSearchParamsChanged) {
      setIsSearchParamsChanged(false);
      debounce(() => {
        if (isTopView) {
          const params = new URLSearchParams();
          if (searchParams) {
            Object.keys(searchParams).forEach((key: string) => {
              const param = searchParams[key as SerchParamsKeys];
              param && params.append(key, param);
            });
          }
          getTopGames(params);
        } else {
          // getCategories(searchParams?.search as string);
          const search = searchParams?.search as string
          const _games = games.categories.map(
            category => {
              const _apps = category.apps.filter(
                app => app.title.toLowerCase().includes(search.toLowerCase())
              )

              return {...category, apps: _apps}
            }
          )
          setFilteredGames(oldGames => {
            if (oldGames) {
              return {...oldGames, categories: _games}
            }
          })
        }
      }, 300);
    }
  }, [isSearchParamsChanged]);

  useEffect(() => {
    const isSearchParams = !!searchParams;
    const filterParams: string[] = Object.keys(filter).filter(
      (f: string) => filter[f as FilterKeys] === true
    );
    setSearchParams({
      ...searchParams,
      order: filterParams.join(','),
      direction: filter.direction as string,
    });
    setIsSearchParamsChanged(isSearchParams);
  }, [filter]);

  useEffect(() => {
    page.setLoading(isLoading || isTopGamesLoading, true);
  }, [isLoading, isTopGamesLoading]);

  const topViewHandler = () => {
    setIsCategoryView(false);
    setIsTopView(true);
  };

  const categoryViewHandler = () => {
    setIsTopView(false);
    setIsCategoryView(true);
  };

  const searchHandler = (value: string) => {
    setSearchParams((params) => ({ ...params, search: value }));
    setIsSearchParamsChanged(true);
  };

  return (
    <Page>
      <Column>
        <SearchBar
          onChange={searchHandler}
          value={searchParams?.search || ''}
        />
        <Tabs className="grid-columns w-full game-tabs">
          <Tab onClick={topViewHandler} isActive={isTopView}>
            {t('tab-top')}
          </Tab>
          <Tab onClick={categoryViewHandler} isActive={isCategoryView}>
            {t('tab-categories')}
          </Tab>
        </Tabs>
        <Row className="w-screen">
          <Slider
            settings={{
              slidesPerView: 'auto',
              centeredSlides: true,
              spaceBetween: 5,
              pagination: {
                clickable: true,
              },
            }}>
            {games.marketings &&
              games.marketings.map((image) => (
                <SwiperSlide key={`playground_slide-${image.id}`}>
                  <Link to={image.url}>
                    <img
                      src={image.image}
                      alt={image.title}
                      className="games-marketing-image"
                    />
                  </Link>
                </SwiperSlide>
              ))}
          </Slider>
        </Row>
        {isCategoryView && filteredGames && <GameList games={filteredGames.categories} />}
        {isTopView && <TopRate games={topGames} />}
      </Column>
    </Page>
  );
}

export default PlayGround;
