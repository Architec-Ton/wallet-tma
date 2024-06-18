import Column from "../../../containers/Column"
import Row from "../../../containers/Row"
import { GameListItemType } from "../../../../types/gameTypes"
import { iconButtonArraw } from '../../../../assets/icons/buttons'

import './index.css'
import { useNavigate } from "react-router-dom"

type OwnPropsType = {
  game: GameListItemType
}

const GameListItem = ({ game }: OwnPropsType) => {
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate(`/playground/${game.id}`)
  }

  return (
    <Row className="category-game" onClick={clickHandler}>
      <img src={game.thumbnail} alt="" className="category-game__icon" />
      <Column className="category-game__info">
        <div className="category-game__title">{game.title}</div>
        <div className="category-game__description">{game.description}</div>
      </Column>
      <img src={iconButtonArraw} alt="" className="category-game__button"  />
    </Row>
  )
}

export default GameListItem