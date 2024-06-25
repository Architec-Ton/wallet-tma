import { QRCode } from "react-qrcode-logo"
import Section from "../../components/containers/Section"
import Block from "../../components/typography/Block"
import Column from "../../components/containers/Column"
import { useLocation } from "react-router-dom"
import { AssetType } from "./ReceiveAsset"
import useLanguage from "../../hooks/useLanguage"
import FormatMessage from "../../components/typography/FormatMessage"

const AddCryptoAddress = () => {
  const t = useLanguage("add-crypto")
  const { state }: { state: AssetType } = useLocation()
  const copyAddressHandler = () => {
    navigator.clipboard.writeText("UQWQCHDSDNsfjiASXDSOsdUNPxlRi-GBmsdpaskow-7bgC")
  }

  return (
    <>
    <Section title={t("your-coin-address", undefined, { coin: state.coin })} className="address-description__container">
      <div className="address-description">
        <FormatMessage>
          {t("description", undefined, { coinInfo: `${state.coin} (${state.title})` })}
        </FormatMessage>
      </div>
    </Section>
    <Section title="" className="qrcode-section">
      <Block className="qrcode-block">
        <Column className="address-qrcode">
          <QRCode
            value={`ton://transfer/${state.wallet}`}
            size={190}
            logoImage={state.thumb}
          />
          <div className="qrcode-description">
            {t("qr-hint", undefined, { title: state.title })}
          </div>
        </Column>
      </Block>
      <Block>
        <Column className="wallet-info">
          <div className="wallet-info__title">{t("coin-address", undefined, { coin: state.title })}</div>
          <div className="wallet">{state.wallet}</div>
          <button className="primary-button wallet-copy-button" onClick={copyAddressHandler}>{t("copy")}</button>
        </Column>
      </Block>
    </Section>
    </>
  )
}

export default AddCryptoAddress