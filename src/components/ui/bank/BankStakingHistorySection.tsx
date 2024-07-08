import { formatDate } from "date-fns"
import Section from "../../containers/Section"
import Block from "../../typography/Block"
import ListBlock from "../listBlock"
import ListBaseItem from "../listBlock/ListBaseItem"

import "./BankStakingHistorySection.styles.css"
import useLanguage from "../../../hooks/useLanguage"

export type StakeHistoryType = {
  date: string
  rewards: number
  deposit: number
  claimAvailable?: boolean
}

type OwnPropsType = {
  stakeHistory: StakeHistoryType | null
  title?: string
  readMore?: React.ReactNode
  onClaim?: () => void
}

const BankStakingHistorySection = ({stakeHistory, title, readMore, onClaim}: OwnPropsType) => {
  const t = useLanguage("bank-stake-history")
  return (
    <Section title={title} readMore={readMore}>
      {!stakeHistory && <Block className="stake-history-loss">{t("empty-description")}</Block>}
      {stakeHistory && (
        <ListBlock>
          <ListBaseItem>
            <div>{t("date")}</div>
            <div>{formatDate(stakeHistory.date, "dd.MM.yyyy")}</div>
          </ListBaseItem>
          <ListBaseItem>
            <div>{t("deposit")}</div>
            <div>{stakeHistory.deposit}</div>
          </ListBaseItem>
          <ListBaseItem>
            <div>{t("rewards")}</div>
            <div>{stakeHistory.rewards}</div>
          </ListBaseItem>
          {stakeHistory.claimAvailable && (
            <ListBaseItem className="claim-button" onClick={onClaim}>
              <span>{t("claim")}</span>
            </ListBaseItem>
          )}
        </ListBlock>
      )}
    </Section>
  )
}

export default BankStakingHistorySection