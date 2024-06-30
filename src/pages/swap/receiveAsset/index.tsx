import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { AssetDataType } from ".."
import { iconOpenButton } from "../../../assets/icons/buttons"
import { iconPepe, iconUsdt } from "../../../assets/icons/jettons"
import Row from "../../../components/containers/Row"
import Section from "../../../components/containers/Section"

type OwnPropsType = {
  asset: AssetDataType
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
}

const ReceiveAsset = ({ asset, onChange, value }: OwnPropsType) => {
  return (
    <Section title="Receive" readMore="1 USDT = 120000000 PEPE">
      <Row className="justify-between asset-row">
        <Row className="asset-button asset-receive-button">
          <img src={asset.icon} alt="" className="asset-icon" />
          <div className="asset-title">{asset.title}</div>
          <img src={iconOpenButton} alt="" className="asset-open-icon" />
        </Row>
      </Row>
      <Row className="justify-between asset-data-row">
        <input type="number" value={value} className="asset-input" onChange={onChange} placeholder="0" />
        <div className="asset-feat-value">$100.1</div>
      </Row>
    </Section>
  )
}

export default ReceiveAsset
