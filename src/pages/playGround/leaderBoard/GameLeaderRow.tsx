import { bigNumberFormatter } from "../../../utils/formatter"
import "./GameLeaderRow.styles.css"

type OwnProps = {
  num: string | number
  name: string
  totalCoins: string
  asset: string
  time: string
  isHeader?: boolean
}

const GameLeaderRow = ({ num, name, totalCoins, asset, time, isHeader }: OwnProps) => {
  return (
    <>
      <div>{num}</div>
      <div className="leader-data">
        <div className="leader-row">
          <div className="name">{name}</div>
          <div className="total-coins">{isHeader && totalCoins || bigNumberFormatter(Number(totalCoins)) }</div>
          <div className="asset">{asset}</div>
          <div className="time">{time}</div>
        </div>
      </div>
    </>
  )
}

export default GameLeaderRow