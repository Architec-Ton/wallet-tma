import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { AssetDataType } from ".."
import { iconOpenButton } from "../../../assets/icons/buttons"
import Row from "../../../components/containers/Row"
import Section from "../../../components/containers/Section"
import { CoinDto } from "../../../types/assest"
import classNames from "classnames"
import useLanguage from "../../../hooks/useLanguage"

type OwnPropsType = {
  asset: AssetDataType
  coin: CoinDto | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  forceChange: (v: string) => void
  value: string
  disabled: boolean
}

const SendAsset = ({ asset, coin, disabled, onChange, onClick, forceChange, value }: OwnPropsType) => {
  const [assetValue, setAssetValue] = useState<string>('')

  const t = useLanguage("swap")

  useEffect(() => {
    setAssetValue(value || '')
  }, [value])

  const isInsuffucientBalance = useMemo(() => {
    return coin && (coin.amount - Number(assetValue) < 0)
  }, [coin, assetValue])

  const clearHandler = () => {
    setAssetValue('')
    forceChange('')
  }

  const halfHandler = () => {
    const newValue = (asset.balance / 2).toString()
    setAssetValue(newValue)
    forceChange(newValue)
  }

  const maxHandler = () => {
    setAssetValue(asset.balance.toString())
    forceChange(asset.balance.toString())
  }

  return (
    <Section
      title={t("send")}
      readMore={
        `${t("balance")}: 
        ${coin && (
          Number(coin?.amount) >= Number(assetValue) ? Number(coin?.amount) - Number(assetValue) : 0
        ).toLocaleString(undefined, { maximumFractionDigits: coin?.meta?.decimals }) || 0}`
      }
    >
      <Row className="justify-between asset-row">
        <Row className="asset-button asset-send-button" onClick={onClick}>
          {asset.icon && <img src={asset.icon} alt="" className="asset-icon" />}
          <div className="asset-title">{asset.title || t("select")}</div>
          <img src={iconOpenButton} alt="" className="asset-open-icon" />
        </Row>
        <Row className="controls-container">
          <button className="rounded-button control-button" onClick={clearHandler} disabled={!asset.title}>{t("clear")}</button>
          <button className="rounded-button control-button" onClick={halfHandler} disabled={!asset.title || isInsuffucientBalance}>50%</button>
          <button className="rounded-button control-button" onClick={maxHandler} disabled={!asset.title || isInsuffucientBalance}>{t("max")}</button>
        </Row>
      </Row>
      <Row className="justify-between asset-data-row">
        <input
          type="string"
          value={assetValue}
          className={classNames("asset-input", { "error": isInsuffucientBalance})}
          onChange={onChange}
          placeholder="0"
          disabled={disabled}
        />
        <div className="asset-feat-value">
          {coin && (coin.usdPrice * Number(assetValue)).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
        </div>
      </Row>
    </Section>
  )
}

export default SendAsset
