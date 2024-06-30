import {useMemo, useEffect, useState, ChangeEventHandler, useCallback} from "react"

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
import AssetsList from "../../components/ui/swap/AssetsList"
import { AssetInfo, StonApiClient } from "@ston-fi/api"
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react"
import { useClosure } from "../../hooks/useClosure"
import ModalPinCode from "../../components/ui/modals/modalPinCode"
import TransactionModal from "../../components/ui/modals/transactionModal"
import { setAssets } from "../../features/swap/swapSlice"

export type AssetDataType = {
  title: string
  icon: string
  balance: number
  value?: string
}

export type JetonWalletType = {
  address: string
  balance: string
  owner: string
  jetton: string
  last_transaction_lt: string
  code_hash: string
  data_hash: string
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

const client = new StonApiClient();

const Swap = () => {
  const [swapAssets, setSwappAssets] = useState(swapData)
  const [tokenAssets, setTokenAssets] = useState<AssetInfo[]>()
  const [showAssetsList, setShowAssetsList] = useState(false)
  const [jettonWallets, setJettonWallets] = useState<any>()
  const [swappingTokenMode, setSwappingTokenMode] = useState<'send' | 'receive' | null>(null)
  const [showPinCode, setShowPinCode] = useState<boolean>(false)
  const [showTransaction, setShowTransaction] = useState<boolean>(false)
  const [showTransactionComplete, setShowTransactionComplete] = useState<boolean>(false)
  const wallet = useTonAddress();
  const dispatch = useAppDispatch()

  useEffect(() => {
    client.getAssets().then(response => {
      const filteredAssets = response.filter(asset => asset.defaultSymbol === true)
      dispatch(setAssets(filteredAssets))
    }).catch(e => {
        console.error(e)
    })
    dispatch(setLoading(false))
  }, [])

  useEffect(() => {
    if (wallet) {
        fetch(`https://toncenter.com/api/v3/jetton/wallets?owner_address=${wallet}&limit=128&offset=0`, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            const { jetton_wallets } = data
            const jettonBalances = {};
            jetton_wallets.reduce(
                (accumulator: any, currentJetton: JetonWalletType) => {
                    const jetton = currentJetton.jetton
                    const address = currentJetton.address
                    accumulator[jetton] = {balance: currentJetton.balance, address: address}
                },
                jettonBalances,
            );
            console.log("jettonBalances", jettonBalances)
            setJettonWallets(jettonBalances)
        }).catch(e => {
            console.error(e)
        })
    }
}, [wallet])

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

  const chooseAssetHandler = useClosure((mode: 'send' | 'receive') => {
    setSwappingTokenMode(mode)
    setShowAssetsList(true)
  })

  const closeAssetsList = () => {
    setSwappingTokenMode(null)
    setShowAssetsList(false)
  }

  const setJeton = (asset: AssetInfo) => {
      // setIsBuyStep(false)
      // setJetonValue(null)
      // setTonValue(null)
      setSwappAssets(({ send, receive }) => {
        if (swappingTokenMode === 'send') {
          return {
            send: {
              title: asset.displayName as string,
              balance: asset.balance ? Number(asset.balance) : 0,
              icon: asset.imageUrl as string,
              value: ''
            },
            receive
          } satisfies SwapDataType
        } else {
          return {
            send,
            receive: {
              title: asset.displayName as string,
              balance: asset.balance ? Number(asset.balance) : 0,
              icon: asset.imageUrl as string,
              value: ''
            }
          } satisfies SwapDataType
        }
      })
      setShowAssetsList(false)
  }

  const swapHanler = () => {
    setShowPinCode(true)
  }

  const onPinSuccess = () => {
    setShowPinCode(false)
    setShowTransaction(true)
  }

  return (
    <Page title="Swap" pageControl={pageControl} className="swap">
      <Delimiter />
      <SendAsset asset={swapAssets.send} onChange={changeSendHandler} onClick={chooseAssetHandler('send')} value={swapAssets.send.value || ''} />
      <Delimiter>
        <img src={iconReverseButton} alt="" onClick={reverseSwaping} />
      </Delimiter>
      <ReceiveAsset asset={swapAssets.receive} onChange={changeReceiveHandler} onClick={chooseAssetHandler('receive')} value={swapAssets.receive.value || ''} />

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
      <button className="primary-button rounded-button large-button" onClick={swapHanler}>Swap</button>
      {showAssetsList && <AssetsList onClose={closeAssetsList} onJetonSelect={setJeton} jettonWallets={jettonWallets} />}
      {showPinCode && <ModalPinCode onSuccess={onPinSuccess} mode="registration" />}
      {showTransaction && <TransactionModal onClose={() => setShowTransaction(false)} />}
      {showTransactionComplete}
    </Page>
  )
}

export default Swap
