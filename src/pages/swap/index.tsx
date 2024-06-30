import {useMemo, useEffect, useState, ChangeEventHandler} from "react"

import Page from "../../components/containers/Page"
import Section from "../../components/containers/Section"
import Delimiter from "../../components/typography/Delimiter"
import Row from "../../components/containers/Row"
import { iconOpenButton, iconReverseButton, iconSettingsButton } from "../../assets/icons/buttons"
import {useAppDispatch} from "../../hooks/useAppDispatch"
import {setLoading} from "../../features/page/pageSlice"

import "./index.css"
import { iconPepe, iconUsdt } from "../../assets/icons/jettons"
import SendAsset from "./sendAsset"
import ReceiveAsset from "./receiveAsset"

export type AssetDataType = {
  title: string
  icon: string
  balance: number
  value?: string
}

type SwapDataType = {
  send: AssetDataType
  receive: AssetDataType
}

const swapData: SwapDataType = {
  send: {
    title: "USDT",
    icon: iconUsdt,
    balance: 120,
    value: ''
  } satisfies AssetDataType,
  receive: {
    title: "PEPE",
    icon: iconPepe,
    balance: 1100000,
    value: ''
  } satisfies AssetDataType
}

const Swap = () => {
  const [swapAssets, setSwappAssets] = useState(swapData)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setLoading(false))
  }, [])

  const pageControlHandler = () => {
    console.log("pageControlHandler")
  }

  const pageControl = useMemo(() => {
    return <img src={iconSettingsButton} onClick={pageControlHandler} alt="" />
  }, [])

  const reverseSwaping = () => {
    setSwappAssets(prevData => {
      const { send, receive } = prevData
      return { send: receive, receive: send}
    })
  }

  const changeReceiveHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value
    setSwappAssets(({ send, receive }) => {
      return {
        send,
        receive: {...receive, value}
      } satisfies SwapDataType
    })
  }

  const changeSendHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value
    setSwappAssets(({ send, receive }) => {
      return {
        send: {...send, value},
        receive
      } satisfies SwapDataType
    })
  }

  return (
    <Page title="Swap" pageControl={pageControl} className="swap">
      <Delimiter />
      <SendAsset asset={swapAssets.send} onChange={changeSendHandler} value={swapAssets.send.value || ''} />
      <Delimiter>
        <img src={iconReverseButton} alt="" onClick={reverseSwaping} />
      </Delimiter>
      <ReceiveAsset asset={swapAssets.receive} onChange={changeReceiveHandler} value={swapAssets.receive.value || ''} />

      <Section>
        <Delimiter />
        <Row className="justify-between swap-info-row">
          <div>You receive (icnl. fee)</div>
          <div>$100.01</div>
        </Row>
        <Delimiter />
        <Row className="justify-between swap-info-row">
          <div>Route</div>
          <div>TON {'>>'} PEPE</div>
        </Row>
        <Delimiter />
      </Section>
      <button className="primary-button rounded-button large-button">Swap</button>
    </Page>
  )
}

export default Swap
