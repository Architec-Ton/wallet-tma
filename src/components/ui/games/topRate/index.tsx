import GameListSection from "../listSection"
import { GameListItemType } from "../../../../types/gameTypes"
import useLanguage from "../../../../hooks/useLanguage"

type TopRatePropsType = {
  games?: GameListItemType[]
}

const TopRate = ({ games }: TopRatePropsType) => {
  const t = useLanguage("game")
  if (!games) {
    return null
  }
  
  return (
    <GameListSection title={t("top-rated-title")} list={games} />
  )
}

export default TopRate
