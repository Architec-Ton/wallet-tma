import { MouseEventHandler } from "react"
import Column from "../../containers/Column"
import Row from "../../containers/Row"

type OwnPropsType = {
  thumb?: string
  title?: string
  description?: string
  iconAction?: string
  onClick?: CallableFunction
}

const ListBlockItem = ({ thumb, title, description, iconAction, onClick }: OwnPropsType) => {
  const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClick) {
      onClick(e)
    }
  }
  return (
    <Row className="list-block" onClick={clickHandler}>
      {thumb && <img src={thumb} alt="" className="list-block__icon" />}
      <Column className="list-block__info">
        {title && <div className="list-block__title">{title}</div>}
        {description && <div className="list-block__description">{description}</div>}
      </Column>
      {iconAction && <img src={iconAction} alt="" className="list-block__button"  />}
    </Row>
  )
}

export default ListBlockItem