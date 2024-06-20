import { ChangeEvent, useMemo } from "react"
import Block from "../../../typography/Block"
import { FilterType } from "../../../../pages/playGround/CategoryGames"
import useLanguage from "../../../../hooks/useLanguage"

type OwnPropsType = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
  filter: FilterType
}

const GameListFilter = ({ onChange, onClear, filter }: OwnPropsType) => {
  const t = useLanguage("game")

  const filtersStatus = useMemo(() => {
    return {
      name: filter.name ? t("filter-on"): t("filter-off"),
      rate: filter.rate ? t("filter-on"): t("filter-off"),
      news: filter.news ? t("filter-on"): t("filter-off"),
    }
  }, [filter])

  return (
    <>
      <Block className="filter-row">
        <label className="w-full">
          <div>Sort by name</div>
          <input type="checkbox" name="name" checked={filter.name} onChange={onChange} />
          <span>{filtersStatus.name}</span>
        </label>
      </Block>
      <Block className="filter-row">
        <label className="w-full">
          <div>Sort by rating</div>
          <input type="checkbox" name="rate" checked={filter.rate} onChange={onChange} />
          <span>{filtersStatus.rate}</span>
        </label>
      </Block>
      <Block className="filter-row">
        <label className="w-full">
          <div>Sort by newest</div>
          <input type="checkbox" name="news" checked={filter.news} onChange={onChange} />
          <span>{filtersStatus.news}</span>
        </label>
      </Block>
      <Block className="filter-row">
        <label className="w-full" onClick={onClear}>
          <span>Clear filter</span>
        </label>
      </Block>
    </>
  )
}

export default GameListFilter