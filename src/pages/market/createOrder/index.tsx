import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Page from "components/containers/Page";
import { usePage } from "hooks/usePage";
import useLanguage from "hooks/useLanguage";
import ListBlock from "components/ui/listBlock";
import Section from "components/containers/Section";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import Row from "components/containers/Row";
import Tabs from "components/ui/tabs";
import Tab from "components/ui/tabs/Tab";
import SelectButton from "components/ui/buttons/selectButton";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { marketModeSelector, orderPrimaryAssetSelector, orderSecondaryAssetSelector } from "features/market/marketSelectors";
import { MarketModeEnum, setMarketMode, setOrderPrimaryAsset, setOrderSecondaryAsset, setOrderValues } from "features/market/marketSlice";
import AssetsModal from "components/ui/market/modals/AsetsModal";
import { CoinDto } from "types/assest";
import classNames from "classnames";
import { useTmaMainButton } from "hooks/useTma";
import { useNavigate } from "react-router-dom";
import { assets } from "../mock"

import "./index.css"

const CreateMarketOrder = () => {
  const t = useLanguage("market-order-form")
  const page = usePage()
  const dispatch = useAppDispatch()
  const btn = useTmaMainButton()
  const navigate = useNavigate()

  const orderMode = useAppSelector(marketModeSelector)
  const from_asset = useAppSelector(orderPrimaryAssetSelector)
  const to_asset = useAppSelector(orderSecondaryAssetSelector)
  const [showAssetsModal, setShowAssetsModal] = useState<boolean>(false)
  const [assetsModalTitle, setAssetsModalTitle] = useState<string>("")
  const [selectedAsset, setSelectedAsset] = useState<"primary" | "secondary" | undefined>()
  const [from_value, setFromValue] = useState<string>("")
  const [to_value, setToValue] = useState<string>("")
  
  useEffect(() => {
    if (!from_asset) {
      dispatch(setOrderPrimaryAsset(assets[0]))
    }
    if (!to_asset) {
      dispatch(setOrderSecondaryAsset(assets[1]))
    }
    page.setLoading(false)
  }, [])

  const isValid = useMemo(() => {
    if (from_asset && to_asset) {
      return (
        orderMode === MarketModeEnum.SELL
        ? Number(from_value) > 0 && Number(from_value) <= from_asset.amount && Number(to_value) > 0
        : Number(to_value) > 0 && Number(to_value) <= to_asset.amount && Number(from_value) > 0
      )
    }
  }, [from_asset, to_asset, from_value, to_value])

  useEffect(() => {
    if (isValid) {
      btn.init(t("create-ad", "market"), () => {
        dispatch(setOrderValues({
          from_value: Number(from_value),
          to_value: Number(to_value)
        }))
        navigate("confirm")
      }, true)
    } else {
      btn.setVisible(false)
    }
  }, [isValid, from_value, to_value])

  const assetLabels = {
    "sell": {
      "sell-asset": t("sell-asset"),
      "receive-asset": t("receive-asset"),
      "sell-amount": t("sell-amount"),
      "receive-amount": t("receive-amount"),
    },
    "buy": {
      "sell-asset": t("buy-asset"),
      "receive-asset": t("receive-asset"),
      "sell-amount": t("purchase-amount"),
      "receive-amount": t("given-amount"),
    }
  }

  const selectPrimaryAsset = () => {
    setAssetsModalTitle(assetLabels[orderMode]["sell-asset"])
    setSelectedAsset("primary")
    setShowAssetsModal(true)
  }

  const selectReceiveAsset = () => {
    setAssetsModalTitle(assetLabels[orderMode]["receive-asset"])
    setSelectedAsset("secondary")
    setShowAssetsModal(true)
  }

  const onAssetSelect = useCallback((asset: CoinDto) => {
    if (selectedAsset === "primary") {
      dispatch(setOrderPrimaryAsset(asset))
    } else {
      dispatch(setOrderSecondaryAsset(asset))
    }
    setShowAssetsModal(false)
  }, [selectedAsset])

  const changeModeToSell = () => {
    dispatch(setMarketMode(MarketModeEnum.SELL))
  }

  const changeModeToBuy = () => {
    dispatch(setMarketMode(MarketModeEnum.BUY))
  }

  const primaryValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value)
    if (!isNaN(value) && value > 0) {
      setFromValue(value.toString())
      // setToValue((value * Number(from_asset?.usdPrice) / Number(to_asset?.usdPrice)).toString())
    } else {
      setFromValue("")
      // setToValue("")
    }
  }

  const secondaryValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value)
    if (!isNaN(value) && value > 0) {
      setToValue(value.toString())
      // setFromValue((value * Number(to_asset?.usdPrice) / Number(from_asset?.usdPrice)).toString())
    } else {
      setToValue("")
      // setFromValue("")
    }
  }

  return (
    <Page>
      <Section title={t("create-order", "market")} className="market-order-form">
        <ListBlock>
          <ListBaseItem>
            <Row className="order-data-row grow">
              <div>{t("want-to")}</div>
              <Tabs className="grid-columns market-action">
                <Tab onClick={changeModeToBuy} isActive={orderMode === MarketModeEnum.BUY}>
                  {t("buy", "market")}
                </Tab>
                <Tab onClick={changeModeToSell} isActive={orderMode === MarketModeEnum.SELL}>
                  {t("sell", "market")}
                </Tab>
              </Tabs>
            </Row>
          </ListBaseItem>
          <ListBaseItem>
            <Row className="order-data-row grow">
              <div>{assetLabels[orderMode]["sell-asset"]}</div>
              <SelectButton onClick={selectPrimaryAsset}>{from_asset?.meta?.symbol}</SelectButton>
            </Row>
          </ListBaseItem>
          <ListBaseItem>
            <Row className="order-data-row grow">
              <div>{assetLabels[orderMode]["receive-asset"]}</div>
              <SelectButton onClick={selectReceiveAsset}>{to_asset?.meta?.symbol}</SelectButton>
            </Row>
          </ListBaseItem>
        </ListBlock>
      </Section>
      <Section title={assetLabels[orderMode]["sell-amount"]}>
        <ListBlock>
          <ListBaseItem>
            <Row className="grow market-asset-info">
              <img src="" alt="" className="market-asset-icon" />
              <div className="grow">{from_asset?.meta?.symbol}</div>
              <div className="secondary-content">
                <input
                  className={classNames("order-asset-input", {"error": orderMode === MarketModeEnum.SELL && Number(from_value) > Number(from_asset?.amount)})}
                  type="number"
                  inputMode="numeric"
                  value={from_value}
                  placeholder="0"
                  onChange={primaryValueChangeHandler}
                />
              </div>
            </Row>
          </ListBaseItem>
          <ListBaseItem>
            <Row className="grow order-data-row">
              <div>{t("your-balance")}</div>
              <div>{from_asset?.amount}</div>
            </Row>
          </ListBaseItem>
        </ListBlock>
      </Section>
      <Section title={assetLabels[orderMode]["receive-amount"]}>
        <ListBlock>
        <ListBaseItem>
            <Row className="grow market-asset-info">
              <img src="" alt="" className="market-asset-icon" />
              <div className="grow">{to_asset?.meta?.symbol}</div>
              <div className="secondary-content">
                <input
                  className={classNames("order-asset-input", {"error": orderMode === MarketModeEnum.BUY && Number(to_value) > Number(to_asset?.amount)})}
                  type="number"
                  inputMode="numeric"
                  value={to_value}
                  placeholder="0"
                  onChange={secondaryValueChangeHandler}
                />
              </div>
            </Row>
          </ListBaseItem>
          <ListBaseItem>
            <Row className="grow order-data-row">
              <div>{t("your-balance")}</div>
              <div>{to_asset?.amount}</div>
            </Row>
          </ListBaseItem>
        </ListBlock>
      </Section>
      {showAssetsModal && (
        <AssetsModal assets={assets} onSelect={onAssetSelect} title={assetsModalTitle} onClose={() => setShowAssetsModal(false)} />
      )}
    </Page>
  )
}

export default CreateMarketOrder