import { useParams } from "react-router-dom"
import Page from "../../../components/containers/Page"
import SearchBar from "../../../components/ui/searchBar"
import { useGetCategoryGamesQuery, useSearchGamesMutation } from "../../../features/gaming/gamingApi"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppDispatch"
import { setLoading } from "../../../features/page/pageSlice"
import useDebounce from "../../../hooks/useDebounce"
import { GameCategoryType, GameFilterType, GameListItemType } from "../../../types/gameTypes"
import GameListSection from "../../../components/ui/games/listSection"
import { selectGamesFilter } from "../../../features/gaming/gamingSelectors"

import "./index.css"

type SearchParamsType = {
  direction?: string
  order?: string
  search?: string
}
type SerchParamsKeys = keyof SearchParamsType
type FilterKeys = keyof GameFilterType;

const CategoryGames = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetCategoryGamesQuery(id as string)
  const [searchGames, { data: searchResult, isLoading: searchIsLoading }] = useSearchGamesMutation()
  const dispatch = useAppDispatch()
  const debounce = useDebounce()
  const filter = useAppSelector(selectGamesFilter)

  const [categoryGamesData, setCategoryGamesData] = useState<GameCategoryType<GameListItemType[]>>()
  const [searchParams, setSearchParams] = useState<SearchParamsType>()
  const [isSearchParamsChanged, setIsSearchParamsChanged] = useState<boolean>(false)

  useEffect(() => {
    dispatch(setLoading(isLoading || searchIsLoading))
  }, [isLoading, searchIsLoading])

  useEffect(() => {
    if (data?.items) {
      setCategoryGamesData(data)
    }
  }, [data])

  useEffect(() => {
    if (searchResult?.items) {
      setCategoryGamesData(searchResult)
    }
  }, [searchResult])

  useEffect(() => {
    if (isSearchParamsChanged) {
      setIsSearchParamsChanged(false)
      debounce(() => {
        const params = new URLSearchParams()
        if (searchParams) {
          Object.keys(searchParams as SearchParamsType).forEach((key: string) => {
            const param = searchParams[key as SerchParamsKeys]
            param && params.append(key, param)
          })
        }
        searchGames({ id: `${id}`, params })
      }, 500)
    }
  }, [isSearchParamsChanged])

  const searchHandler = (value: string) => {
    setSearchParams(params => ({ ...params, search: value }))
    setIsSearchParamsChanged(true)
  }

  useEffect(() => {
    const isSearchParams = !!searchParams
    const filterParams: string[] = Object.keys(filter).filter((f: string) => filter[f as FilterKeys] === true)
    setSearchParams({ ...searchParams, order: filterParams.join(','), direction: filter.direction as string })
    setIsSearchParamsChanged(isSearchParams)
  }, [filter])

  return (
    <Page>
      <SearchBar onChange={searchHandler} value={searchParams?.search || ''} />
      <GameListSection
        title={categoryGamesData?.title as string}
        list={categoryGamesData?.items}
      />
    </Page>
  )
}

export default CategoryGames