import { useParams } from 'react-router-dom';
import Page from '../../../components/containers/Page';
import SearchBar from '../../../components/ui/searchBar';
import {
  useGetCategoryGamesQuery,
  useSearchGamesMutation,
} from '../../../features/gaming/gamingApi';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import { setLoading } from '../../../features/page/pageSlice';
import useDebounce from '../../../hooks/useDebounce';
import {
  GameCategoryType,
  GameFilterType,
  GameListItemType,
} from '../../../types/gameTypes';
import GameListSection from '../../../components/ui/games/listSection';
import { selectGamesFilter } from '../../../features/gaming/gamingSelectors';

import './index.css';

type SearchParamsType = {
  direction?: string;
  order?: string;
  search?: string;
};
type SerchParamsKeys = keyof SearchParamsType;
type FilterKeys = keyof GameFilterType;

const CategoryGames = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryGamesQuery(id as string);
  const [searchGames, { data: searchResult, isLoading: searchIsLoading }] =
    useSearchGamesMutation();
  const dispatch = useAppDispatch();
  const debounce = useDebounce();
  const filter = useAppSelector(selectGamesFilter);

  const [categoryGamesData, setCategoryGamesData] =
    useState<GameCategoryType<GameListItemType[]>>();
  const [searchParams, setSearchParams] = useState<SearchParamsType>();
  const [isSearchParamsChanged, setIsSearchParamsChanged] =
    useState<boolean>(false);
  const [apps, setApps] = useState<GameListItemType[]>([])

  useEffect(() => {
    dispatch(setLoading(isLoading || searchIsLoading));
  }, [isLoading, searchIsLoading]);

  useEffect(() => {
    if (data && data.categories && data.categories.length > 0) {
      setCategoryGamesData(data.categories[0]);
      setApps(data.categories[0].apps)
    }
  }, [data]);

  useEffect(() => {
    if (searchResult?.apps) {
      setCategoryGamesData(searchResult);
    }
  }, [searchResult]);

  useEffect(() => {
    if (isSearchParamsChanged) {
      setIsSearchParamsChanged(false);
      debounce(() => {
        const params = new URLSearchParams();
        if (searchParams) {
          Object.keys(searchParams as SearchParamsType).forEach(
            (key: string) => {
              const param = searchParams[key as SerchParamsKeys];
              param && params.append(key, param);
            }
          );
        }
        searchGames({ id: `${id}`, params });
      }, 500);
    }
  }, [isSearchParamsChanged]);

  const searchHandler = (value: string) => {
    setSearchParams((params) => ({ ...params, search: value }));
    // setIsSearchParamsChanged(true);
    const _apps = categoryGamesData?.apps.filter(app => `${app.title}${app.subtitle}`.toLowerCase().includes(value.toLowerCase()))
    setApps(_apps as GameListItemType[])
  };

  useEffect(() => {
    // const isSearchParams = !!searchParams;
    const filterParams: string[] = Object.keys(filter).filter(
      (f: string) => filter[f as FilterKeys] === true
    );
    let _apps = [...apps]
    const direction = filter.direction === "desc" ? 1 : -1

    if(filterParams.length) {
      filterParams.forEach(param => {
        console.log(param)
        _apps = _apps.sort((a, b) => {
          switch(param) {
            case "name":
              if (a.title > b.title)
                return -1 * direction
              else if (a.title < b.title)
                return direction
              return 0
            case "rate":
              if (a.rating > b.rating)
                return direction
              else if (a.rating < b.rating)
                return -1 * direction
              return 0
            case "date":
              if (Number(a.date) > Number(b.date))
                return direction
              else if (Number(a.date) < Number(b.date))
                return -1 * direction
              return 0
            default:
              return 0
          }
        })
      })
    } else {
      _apps = _apps.sort((a, b) => {
        if (a.title > b.title)
          return -1 * direction
        else if (a.title < b.title)
          return direction
        return 0
      })
    }
    setApps(_apps)
    setSearchParams({
      ...searchParams,
      order: filterParams.join(','),
      direction: filter.direction as string,
    });
    // setIsSearchParamsChanged(isSearchParams);
  }, [filter]);

  return (
    <Page>
      <SearchBar onChange={searchHandler} value={searchParams?.search || ''} />
      <GameListSection
        title={categoryGamesData?.title as string}
        list={apps}
      />
    </Page>
  );
};

export default CategoryGames;
