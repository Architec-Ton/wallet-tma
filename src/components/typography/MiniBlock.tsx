import classNames from "classnames"
import Row from "../containers/Row"

import "./MiniBlock.styles.css"

const MiniBlock = (
  { icon, text, className }: {icon: string, text?: string | number, className?: string}
) => {
  return (
    <Row className={classNames("mini-block", className)}>
      <div className="mini-block-icon">
        <img src={icon} alt="" />
      </div>
      <div className="mini-block-content center grow">{text}</div>
    </Row>
  )
}

export default MiniBlock