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
  const primaryAsset = useAppSelector(orderPrimaryAssetSelector)
  const secondaryAsset = useAppSelector(orderSecondaryAssetSelector)
  const [showAssetsModal, setShowAssetsModal] = useState<boolean>(false)
  const [assetsModalTitle, setAssetsModalTitle] = useState<string>("")
  const [selectedAsset, setSelectedAsset] = useState<"primary" | "secondary" | undefined>()
  const [primaryValue, setPrimaryValue] = useState<string>("")
  const [secondaryValue, setSecondaryValue] = useState<string>("")
  
  useEffect(() => {
    if (!primaryAsset) {
      dispatch(setOrderPrimaryAsset(assets[0]))
    }
    if (!secondaryAsset) {
      dispatch(setOrderSecondaryAsset(assets[1]))
    }
    page.setLoading(false)
  }, [])

  const isValid = useMemo(() => {
    if (primaryAsset && secondaryAsset) {
      return (
        orderMode === MarketModeEnum.SELL
        ? Number(primaryValue) > 0 && Number(primaryValue) <= primaryAsset.amount && Number(secondaryValue) > 0
        : Number(secondaryValue) > 0 && Number(secondaryValue) <= secondaryAsset.amount && Number(primaryValue) > 0
      )
    }
  }, [primaryAsset, secondaryAsset, primaryValue, secondaryValue])

  useEffect(() => {
    if (isValid) {
      btn.init(t("create-ad", "market"), () => {
        dispatch(setOrderValues({
          primaryValue: Number(primaryValue),
          secondaryValue: Number(secondaryValue)
        }))
        navigate("confirm")
      }, true)
    } else {
      btn.setVisible(false)
    }
  }, [isValid, primaryValue, secondaryValue])

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
      setPrimaryValue(value.toString())
      // setSecondaryValue((value * Number(primaryAsset?.usdPrice) / Number(secondaryAsset?.usdPrice)).toString())
    } else {
      setPrimaryValue("")
      // setSecondaryValue("")
    }
  }

  const secondaryValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value)
    if (!isNaN(value) && value > 0) {
      setSecondaryValue(value.toString())
      // setPrimaryValue((value * Number(secondaryAsset?.usdPrice) / Number(primaryAsset?.usdPrice)).toString())
    } else {
      setSecondaryValue("")
      // setPrimaryValue("")
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
              <SelectButton onClick={selectPrimaryAsset}>{primaryAsset?.meta?.symbol}</SelectButton>
            </Row>
          </ListBaseItem>
          <ListBaseItem>
            <Row className="order-data-row grow">
              <div>{assetLabels[orderMode]["receive-asset"]}</div>
              <SelectButton onClick={selectReceiveAsset}>{secondaryAsset?.meta?.symbol}</SelectButton>
            </Row>
          </ListBaseItem>
        </ListBlock>
      </Section>
      <Section title={assetLabels[orderMode]["sell-amount"]}>
        <ListBlock>
          <ListBaseItem>
            <Row className="grow market-asset-info">
              <img src="" alt="" className="market-asset-icon" />
              <div className="grow">{primaryAsset?.meta?.symbol}</div>
              <div className="secondary-content">
                <input
                  className={classNames("order-asset-input", {"error": orderMode === MarketModeEnum.SELL && Number(primaryValue) > Number(primaryAsset?.amount)})}
                  type="number"
                  inputMode="numeric"
                  value={primaryValue}
                  placeholder="0"
                  onChange={primaryValueChangeHandler}
                />
              </div>
            </Row>
          </ListBaseItem>
          <ListBaseItem>
            <Row className="grow order-data-row">
              <div>{t("your-balance")}</div>
              <div>{primaryAsset?.amount}</div>
            </Row>
          </ListBaseItem>
        </ListBlock>
      </Section>
      <Section title={assetLabels[orderMode]["receive-amount"]}>
        <ListBlock>
        <ListBaseItem>
            <Row className="grow market-asset-info">
              <img src="" alt="" className="market-asset-icon" />
              <div className="grow">{secondaryAsset?.meta?.symbol}</div>
              <div className="secondary-content">
                <input
                  className={classNames("order-asset-input", {"error": orderMode === MarketModeEnum.BUY && Number(secondaryValue) > Number(secondaryAsset?.amount)})}
                  type="number"
                  inputMode="numeric"
                  value={secondaryValue}
                  placeholder="0"
                  onChange={secondaryValueChangeHandler}
                />
              </div>
            </Row>
          </ListBaseItem>
          <ListBaseItem>
            <Row className="grow order-data-row">
              <div>{t("your-balance")}</div>
              <div>{secondaryAsset?.amount}</div>
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