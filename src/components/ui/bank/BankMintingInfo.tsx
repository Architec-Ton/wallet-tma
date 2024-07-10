import useLanguage from "../../../hooks/useLanguage"
import Grid from "../../containers/Grid"
import BlockWithTitle from "../../typography/BlockWithTitle"
import "./BankMintingInfo.styles.css"

const progress = 79
const bankers = 1345
const freeBanks = 275000

const BankMintingInfo = () => {
  const t = useLanguage("bank")
  return (
    <BlockWithTitle title={t('minting')} hintMessage={t('minting-hint')} className="minting-info__block">
      <Grid columns={3} gap={4} className="minting-info">
        <Grid rowSpan={2}>
          <div className="minting-percent">
            <div className="percent-progress grow" style={{ height: `${progress}%`}}>{progress}%</div>
          </div>
        </Grid>
        <Grid colSpan={2} className="bankers">
          <div>{t('bankers')}</div>
          <div>{bankers.toLocaleString()}</div>
        </Grid>
        <Grid colSpan={2} className="free-banks">
          <div>{t("free-banks")}</div>
          <span>{freeBanks.toLocaleString()}</span>
        </Grid>
      </Grid>
    </BlockWithTitle>
  )
}

export default BankMintingInfo