import React, { useCallback, useEffect, useState } from "react";
import Page from "components/containers/Page";
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import FilterBlock from "components/ui/market/FilterBlock";
import AssetsModal from "components/ui/market/modals/AsetsModal";
import { assets, order } from "../mock"
import { CoinDto } from "types/assest";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { MarketModeEnum, setOrderPrimaryAsset, setOrderSecondaryAsset } from "features/market/marketSlice";
import { marketSelector } from "features/market/marketSelectors";
import Row from "components/containers/Row";
import ResponsiveInput from "components/inputs/ResponsiveInput";
import Column from "components/containers/Column";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import { useClosure } from "hooks/useClosure";
import { useNavigate } from "react-router-dom";
import { MarketOrderDto } from "types/market";

const orders = [order, order, order]

const MarketOrder = () => {
  const t = useLanguage("market")
  const page = usePage()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { primaryAsset, secondaryAsset, mode } = useAppSelector(marketSelector)
  const [showPrimaryAssetModal, setShowPrimaryAssetModal] = useState<boolean>()
  const [showSecondaryAssetModal, setShowSecondaryAssetModal] = useState<boolean>()
  const [filteredOrders, setFilteredOrders] = useState<MarketOrderDto[]>()
  const [amountValue, setAmountValue] = useState<string>("")
  const [textData, setTextData] = useState<any>()

  useEffect(() => {
    setFilteredOrders(orders)
  }, [])

  useEffect(() => {
    const amount = Number(amountValue)
    const filteredOrders = orders.filter(order => {
      let condition = order.primaryValue >= amount
      condition = primaryAsset ? condition && order.assets.primaryAsset.meta?.symbol === primaryAsset.meta?.symbol : condition
      condition = secondaryAsset ? condition && order.assets.secondaryAsset.meta?.symbol === secondaryAsset.meta?.symbol : condition
      return condition
    })
    setFilteredOrders(filteredOrders)
  }, [primaryAsset, secondaryAsset, amountValue])

  useEffect(() => {
    const textData = mode === MarketModeEnum.BUY
    ? {
      pageTitle: t("buying"),
      primaryAssetLabel: t("buying-asset"),
      secondaryAssetLabel: t("given-asset"),
      buttonText: t("buy"),
      ownerLabel: t("buyer"),
      stats: t("stats"),
    }
    : {
      pageTitle: t("selling"),
      primaryAssetLabel: t("selling-asset"),
      secondaryAssetLabel: t("receiving-asset"),
      buttonText: t("sell"),
      ownerLabel: t("seller"),
      stats: t("stats"),
    }
    setTextData(textData)
  }, [mode])

  const buyingAssetHandler = () => {
    setShowPrimaryAssetModal(!showPrimaryAssetModal)
  }

  const givingAssetHandler = () => {
    setShowSecondaryAssetModal(!showSecondaryAssetModal)
  }

  const onPrimaryAssetSelect = useCallback((asset: CoinDto) => {
    dispatch(setOrderPrimaryAsset(asset))
    setShowPrimaryAssetModal(false)
  }, [])

  const onSecondaryAssetSelect = useCallback((asset: CoinDto) => {
    dispatch(setOrderSecondaryAsset(asset))
    setShowSecondaryAssetModal(false)
  }, [])

  const amountChangeHandler = (value: string) => {
    const _v = Number(value)
    if (!isNaN(_v) && _v > 0) {
      setAmountValue(_v.toString())
    } else {
      setAmountValue("")
    }
  }

  useEffect(() => {
    page.setLoading(false)
  }, [])

  const orderClickHandler = useClosure((uid: string) => {
    navigate(uid)
  })

  return (
    <Page title={textData?.pageTitle}>
      <Row className="orders-filter">
        <FilterBlock title={textData?.primaryAssetLabel} value={primaryAsset?.meta?.symbol || t("all")} onClick={buyingAssetHandler} withIcon />
        <FilterBlock title={textData?.secondaryAssetLabel} value={secondaryAsset?.meta?.symbol || t("all")} onClick={givingAssetHandler} withIcon />
        <FilterBlock title={t("amount")} className="amount-block">
          <ResponsiveInput onChangeHandler={amountChangeHandler} value={amountValue} />
        </FilterBlock>
      </Row>

      <Column>
        {filteredOrders?.map(orderData => (
          <ListBlock key={orderData.uid}>
            <ListBaseItem className="market-order-card">
              <div className="card-icon-container">
                <img src={orderData.assets.primaryAsset.meta?.image} alt="" className="primary-icon" />
                <img src={orderData.assets.secondaryAsset.meta?.image} alt="" className="secondary-icon" />
              </div>
              <Column className="grow">
                <div>{orderData.primaryValue} {orderData.assets.primaryAsset.meta?.symbol}</div>
                <div className="secondary-content text-sm">{orderData.secondaryValue} {orderData.assets.secondaryAsset.meta?.symbol}</div>
              </Column>
              <button className="small-button rounded-button primary-button" onClick={orderClickHandler(order.uid)}>{textData?.buttonText}</button>
            </ListBaseItem>
            <ListBaseItem>
              <Column className="w-full">
                <Row className="order-data-row">
                  <div className="secondary-content">{textData?.ownerLabel}</div>
                  <div>{orderData?.userName}</div>
                </Row>
                <Row className="order-data-row">
                  <div className="secondary-content">{textData?.stats}</div>
                  <div>{orderData?.stats}</div>
                </Row>
              </Column>
            </ListBaseItem>
          </ListBlock>
        ))}
      </Column>
      
      {showPrimaryAssetModal && <AssetsModal assets={assets} onSelect={onPrimaryAssetSelect} title={textData?.primaryAssetLabel} onClose={buyingAssetHandler} />}
      {showSecondaryAssetModal && <AssetsModal assets={assets} onSelect={onSecondaryAssetSelect} title={textData?.secondaryAssetLabel} onClose={givingAssetHandler} />}
    </Page>
  )
}

export default MarketOrder