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
import { marketAssets, marketModeSelector, marketWalletAssets, orderPrimaryAssetSelector, orderSecondaryAssetSelector } from "features/market/marketSelectors";
import { MarketModeEnum, setMarketMode, setOrderPrimaryAsset, setOrderSecondaryAsset, setOrderValues } from "features/market/marketSlice";
import AssetsModal from "components/ui/market/modals/AsetsModal";
import { CoinDto } from "types/assest";
import classNames from "classnames";
import { useTmaMainButton } from "hooks/useTma";
import { useNavigate } from "react-router-dom";
import { useApiWalletInfoMutation } from "features/wallet/walletApi";

import "./index.css"
import AssetIcon from "components/ui/assets/AssetIcon";

const CreateMarketOrder = () => {
  const t = useLanguage("market-order-form")
  const page = usePage()
  const dispatch = useAppDispatch()
  const btn = useTmaMainButton()
  const navigate = useNavigate()

  const orderMode = useAppSelector(marketModeSelector)
  const fromAsset = useAppSelector(orderPrimaryAssetSelector)
  const toAsset = useAppSelector(orderSecondaryAssetSelector)
  const assets = useAppSelector(marketAssets)
  const [walletInfoApi] = useApiWalletInfoMutation();
  const [showAssetsModal, setShowAssetsModal] = useState<boolean>(false)
  const [assetsModalTitle, setAssetsModalTitle] = useState<string>("")
  const [selectedAsset, setSelectedAsset] = useState<"primary" | "secondary" | undefined>()
  const [fromValue, setFromValue] = useState<string>("")
  const [toValue, setToValue] = useState<string>("")
  const walletAssets = useAppSelector(marketWalletAssets)
  

  useEffect(() => {
    if (assets) {
      if (!fromAsset) {
        dispatch(setOrderPrimaryAsset(assets[0]))
      }
      if (!toAsset) {
        dispatch(setOrderSecondaryAsset(assets[1]))
      }
    }
  }, [assets])


  const isValid = useMemo(() => {
    if (fromAsset && toAsset) {
      return (
        orderMode === MarketModeEnum.SELL
        ? Number(fromValue) > 0 && Number(fromValue) <= fromAsset.amount && Number(toValue) > 0
        : Number(toValue) > 0 && Number(toValue) <= toAsset.amount && Number(fromValue) > 0
      )
    }
  }, [fromAsset, toAsset, fromValue, toValue])

  useEffect(() => {
    console.log("isValid", isValid)
    if (isValid) {
      btn.init(t("create-ad", "market"), () => {
        dispatch(setOrderValues({
          fromValue: Number(fromValue),
          toValue: Number(toValue)
        }))
        navigate("confirm")
      }, true)
      btn.setVisible(true)
    } else {
      btn.setVisible(false)
    }
  }, [isValid, fromValue, toValue])

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
    } else {
      setFromValue("")
    }
  }

  const secondaryValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value)
    if (!isNaN(value) && value > 0) {
      setToValue(value.toString())
    } else {
      setToValue("")
    }
  }

  const modalAssets = useMemo(() => {
    if (orderMode === MarketModeEnum.BUY) {
      return selectedAsset === "primary" ? assets: walletAssets?.filter(a => a.meta?.symbol !== fromAsset?.meta?.symbol)
    } else {
      return selectedAsset === "primary" ? walletAssets : assets?.filter(a => a.meta?.symbol !== fromAsset?.meta?.symbol)
    }
  }, [orderMode, assets, fromAsset, toAsset, selectedAsset])

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
              <SelectButton onClick={selectPrimaryAsset}>{fromAsset?.meta?.symbol}</SelectButton>
            </Row>
          </ListBaseItem>
          <ListBaseItem>
            <Row className="order-data-row grow">
              <div>{assetLabels[orderMode]["receive-asset"]}</div>
              <SelectButton onClick={selectReceiveAsset}>{toAsset?.meta?.symbol}</SelectButton>
            </Row>
          </ListBaseItem>
        </ListBlock>
      </Section>
      <Section title={assetLabels[orderMode]["sell-amount"]}>
        <ListBlock>
          <ListBaseItem>
            <Row className="grow market-asset-info">
              <AssetIcon asset={fromAsset} className="market-asset-icon" />
              <div className="grow">{fromAsset?.meta?.symbol}</div>
              <div className="secondary-content">
                <input
                  className={classNames("order-asset-input", {"error": orderMode === MarketModeEnum.SELL && Number(fromValue) > Number(fromAsset?.amount)})}
                  type="number"
                  inputMode="numeric"
                  value={fromValue}
                  placeholder="0"
                  onChange={primaryValueChangeHandler}
                />
              </div>
            </Row>
          </ListBaseItem>
          <ListBaseItem>
            <Row className="grow order-data-row">
              <div>{t("your-balance")}</div>
              <div>{fromAsset?.amount}</div>
            </Row>
          </ListBaseItem>
        </ListBlock>
      </Section>
      <Section title={assetLabels[orderMode]["receive-amount"]}>
        <ListBlock>
        <ListBaseItem>
            <Row className="grow market-asset-info">
            <AssetIcon asset={toAsset} className="market-asset-icon" />
              <div className="grow">{toAsset?.meta?.symbol}</div>
              <div className="secondary-content">
                <input
                  className={classNames("order-asset-input", {"error": orderMode === MarketModeEnum.BUY && Number(toValue) > Number(toAsset?.amount)})}
                  type="number"
                  inputMode="numeric"
                  value={toValue}
                  placeholder="0"
                  onChange={secondaryValueChangeHandler}
                />
              </div>
            </Row>
          </ListBaseItem>
          <ListBaseItem>
            <Row className="grow order-data-row">
              <div>{t("your-balance")}</div>
              <div>{toAsset?.amount}</div>
            </Row>
          </ListBaseItem>
        </ListBlock>
      </Section>
      {showAssetsModal && (
        <AssetsModal assets={modalAssets as CoinDto[]} onSelect={onAssetSelect} title={assetsModalTitle} onClose={() => setShowAssetsModal(false)} />
      )}
    </Page>
  )
}

export default CreateMarketOrder