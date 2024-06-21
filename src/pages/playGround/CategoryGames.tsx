import { useParams } from "react-router-dom"
import Page from "../../components/containers/Page"
import Section from "../../components/containers/Section"
import SearchBar from "../../components/ui/searchBar"
import { useGetCategoryGamesQuery, useSearchGamesMutation } from "../../features/gaming/gamingApi"
import { ChangeEventHandler, useEffect, useMemo, useState } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setLoading } from "../../features/page/pageSlice"
import GameListItemGroup from "../../components/ui/games/listItemGroup"
import { iconFilterSquareButton, iconSortButton } from "../../assets/icons/buttons"
import Modal from "../../components/ui/games/modal"
import GameListFilter from "../../components/ui/games/filter"

import "./CategoryGames.styles.css"
import useDebounce from "../../hooks/useDebounce"
import { GameCategoryType, GameListItemType } from "../../types/gameTypes"

export type FilterType = {
  name?: boolean
  rate?: boolean
  date?: boolean
}

type FilterKeys = keyof FilterType;

const initialFilter: FilterType = {
  name: false,
  rate: false,
  date: false
}

type SearchParamsType = {
  direction?: 'asc' | 'desc'
  order?: string
  search?: string
}
type SerchParamsKeys = keyof SearchParamsType

const CategoryGames = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetCategoryGamesQuery(id as string)
  const [searchGames, { data: searchResult, isLoading: searchIsLoading }] = useSearchGamesMutation()
  const dispatch = useAppDispatch()
  const debounce = useDebounce()

  const [filter, setFilter] = useState<FilterType>(initialFilter)
  const [isFilterShow, setIsFilterShow] = useState<boolean>(false)
  const [categoryGamesData, setCategoryGamesData] = useState<GameCategoryType<GameListItemType[]>>()
  const [searchParams, setSearchParams] = useState<SearchParamsType>()
  const [isSearchParamsChanged, setIsSearchParamsChanged] = useState<boolean>(false)

  useEffect(() => {
    dispatch(setLoading(isLoading || searchIsLoading))
    setIsFilterShow(false)
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

  const sortHandler = () => {
    setSearchParams(params => {
      const prevDirection = params?.direction ?? "desc"
      const direction = prevDirection === "desc" ? "asc": "desc"
      return { ...params, direction }
    })
    setIsSearchParamsChanged(true)
  }

  const modalHandler = () => {
    setIsFilterShow(!isFilterShow)
  }

  const filterHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.currentTarget
    const { checked, name } = target
    const updatedFilter = { ...filter, [name]: !!checked }
    const filterParams: string[] = Object.keys(updatedFilter).filter((f: string) => updatedFilter[f as FilterKeys] === true)
    setFilter(updatedFilter)
    setSearchParams({ ...searchParams, order: filterParams.join(',') })
    setIsSearchParamsChanged(true)
  }

  const clearFilter = () => {
    setFilter(initialFilter)
    setSearchParams(params => {
      const { order, ...otherParams } = params as SearchParamsType
      return { ...otherParams  }
    })
    setIsSearchParamsChanged(true)
  }

  const readMore  = useMemo(() => {
    if (categoryGamesData) {
      return (
        <div className="read-more__component">
          <img src={iconSortButton} onClick={sortHandler} alt="" />
          <img src={iconFilterSquareButton} onClick={modalHandler} alt="" />
        </div>
      )
    }
  }, [categoryGamesData])

  return (
    <Page>
      <SearchBar onChange={searchHandler} />
      <Section title={categoryGamesData?.title as string} readMore={readMore} >
        { categoryGamesData?.items && <GameListItemGroup group={categoryGamesData.items} />}
      </Section>
      {isFilterShow && (
        <Modal title="Filter settings" onClose={modalHandler}>
          <GameListFilter onChange={filterHandler} filter={filter} onClear={clearFilter} />
        </Modal>
      )}
    </Page>
  )
}

export default CategoryGames