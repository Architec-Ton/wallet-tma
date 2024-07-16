import { QRCode } from "react-qrcode-logo"
import Section from "../../components/containers/Section"
import Block from "../../components/typography/Block"
import Column from "../../components/containers/Column"
import { AssetType } from "./ReceiveAsset"
import useLanguage from "../../hooks/useLanguage"
import FormatMessage from "../../components/typography/FormatMessage"
import { useTon } from "../../hooks/useTon"
import { useEffect, useState } from "react"
import { iconTon } from "../../assets/icons/jettons"
import {showAlert} from "../../features/alert/alertSlice.ts";
import {useDispatch} from "react-redux";

const AddCryptoAddress = () => {
  const t = useLanguage("add-crypto")
  const dispatch = useDispatch()
  const ton = useTon()
  const [tonState, setTonState] = useState<AssetType>()

  useEffect(() => {
    if (ton.wallet.address) {
      setTonState({
        thumb: iconTon,
        wallet: ton.wallet.address.toString(),
        title: "TON",
        coin: "Toncoin",
        description: ""
      })
    }
  }, [ton.wallet.address])
  
  const copyAddressHandler = () => {
    if (tonState?.wallet) {
      navigator.clipboard
          .writeText(tonState.wallet)
          .then(() => {
            dispatch(showAlert({message: 'copy', duration: 1500}))
      })
    }
  }

  return (
    <>
    <Section title={t("your-coin-address", undefined, { coin: tonState?.coin })} className="address-description__container">
      <div className="address-description">
        <FormatMessage>
          {t("description", undefined, { coinInfo: `${tonState?.coin} (${tonState?.title})` })}
        </FormatMessage>
      </div>
    </Section>
    <Section title="" className="qrcode-section">
      <Block className="qrcode-block">
        <Column className="address-qrcode">
          <QRCode
            value={`ton://transfer/${tonState?.wallet}`}
            size={190}
            logoImage={tonState?.thumb}
          />
          <div className="qrcode-description">
            {t("qr-hint", undefined, { title: tonState?.title })}
          </div>
        </Column>
      </Block>
      <Block>
        <Column className="wallet-info">
          <div className="wallet-info__title">{t("coin-address", undefined, { coin: tonState?.title })}</div>
          <div className="wallet">{tonState?.wallet}</div>
          <button className="primary-button wallet-copy-button" onClick={copyAddressHandler}>{t("copy")}</button>
        </Column>
      </Block>
    </Section>
    </>
  )
}

export default AddCryptoAddress