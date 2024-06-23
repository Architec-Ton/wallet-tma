import { GameListItemType } from "../../../../types/gameTypes"
import Block from "../../../typography/Block"
import GameListItem from "../listItem"

import './index.css'

type OwnPropsType = {
  group: GameListItemType[]
}

const GameListItemGroup = ({ group }: OwnPropsType) => {
  return (
    <Block className="w-full category-game__block">
      {group.map((item: GameListItemType) => {
        return <GameListItem key={item.id} game={item} />
      })}
    </Block>
  )
}

export default GameListItemGroup