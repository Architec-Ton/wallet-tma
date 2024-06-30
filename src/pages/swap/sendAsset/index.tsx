import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react"
import { AssetDataType } from ".."
import { iconOpenButton } from "../../../assets/icons/buttons"
import { iconUsdt } from "../../../assets/icons/jettons"
import Row from "../../../components/containers/Row"
import Section from "../../../components/containers/Section"

type OwnPropsType = {
  asset: AssetDataType
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  value: string
}

const SendAsset = ({ asset, onChange, onClick, value }: OwnPropsType) => {
  const [assetValue, setAssetValue] = useState<string>(value)

  useEffect(() => {
    setAssetValue(value || '')
  }, [value])

  const clearHandler = () => {
    setAssetValue('')
  }

  const halfHandler = () => {
    const newValue = asset.balance / 2
    setAssetValue(newValue.toString())
  }

  const maxHandler = () => {
    setAssetValue(asset.balance.toString())
  }

  return (
    <Section title="Send" readMore="Balance: 200000">
      <Row className="justify-between asset-row">
        <Row className="asset-button asset-send-button" onClick={onClick}>
          <img src={asset.icon} alt="" className="asset-icon" />
          <div className="asset-title">{asset.title}</div>
          <img src={iconOpenButton} alt="" className="asset-open-icon" />
        </Row>
        <Row className="controls-container">
          <button className="rounded-button control-button" onClick={clearHandler}>Clear</button>
          <button className="rounded-button control-button" onClick={halfHandler}>50%</button>
          <button className="rounded-button control-button" onClick={maxHandler}>Max</button>
        </Row>
      </Row>
      <Row className="justify-between asset-data-row">
        <input type="number" value={assetValue} className="asset-input" onChange={onChange} placeholder="0" />
        <div className="asset-feat-value">$100.1</div>
      </Row>
    </Section>
  )
}

export default SendAsset
