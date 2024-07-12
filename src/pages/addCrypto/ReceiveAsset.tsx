import { useNavigate } from "react-router-dom"
import { iconTon, iconUsdt } from "../../assets/icons/jettons"
import Section from "../../components/containers/Section"
import Delimiter from "../../components/typography/Delimiter"
import ListBlock from "../../components/ui/listBlock"
import ListBlockItem from "../../components/ui/listBlock/ListBlockItem"
import { useClosure } from "../../hooks/useClosure"
import useLanguage from "../../hooks/useLanguage"
import FormatMessage from "../../components/typography/FormatMessage"

export type AssetType = {
  thumb: string
  title: string
  description: string
  wallet: string
  coin: string
}

const ReceiveAsset = () => {
  const t = useLanguage("add-crypto")
  const navigate = useNavigate()
  const assets: AssetType[] = [
    {
      thumb: iconTon,
      title: 'TON',
      description: '31,0407843 TON',
      wallet: 'UQWQCHDSDNsfjiASXDSOsdUNPxlRi-GBmsdpaskow-7bgC',
      coin: 'Toncoin'
    },
    {
      thumb: iconUsdt,
      title: 'USDT',
      description: '221,4215 USDT',
      wallet: 'UQWQCHDSDNsfjiASXDSOsdUNPxlRi-GBmsdpaskow-8bgB',
      coin: 'USDTcoin'
    },
  ]

  const assetClickHandler = useClosure((asset: AssetType) => {
    navigate("/add-crypto/address", {
      state: asset
    })
  })

  return (
    <>
      <Section title={t("choose-asset")} className="add-crypto__container">
        <ListBlock>
          {assets.map((asset, index) => {
            return (
              <ListBlockItem 
                key={`${asset.title}-${index}`}
                thumb={asset.thumb}
                title={asset.title}
                description={asset.description}
                onClick={assetClickHandler(asset)}
              />
            )
          })}
        </ListBlock>
      </Section>
      <Delimiter />
      <div className="asset-info receive">
        <div>
          <FormatMessage components={{span: <span />}}>
            {t("receive-description")}
          </FormatMessage>
        </div>
      </div>
    </>
  )
}

export default ReceiveAsset