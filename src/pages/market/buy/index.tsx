import React, { useCallback, useEffect, useState } from "react";
import Page from "components/containers/Page";

import "./index.css"
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import FilterBlock from "components/ui/market/FilterBlock";
import AssetsModal from "components/ui/market/modals/AsetsModal";
import { assets } from "../mock"
import { CoinDto } from "types/assest";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { setOrderPrimaryAsset, setOrderSecondaryAsset } from "features/market/marketSlice";
import { marketSelector } from "features/market/marketSelectors";
import Row from "components/containers/Row";

const MarketBuy = () => {
  const t = useLanguage("market")
  const page = usePage()
  const dispatch = useAppDispatch()
  const { primaryAsset, secondaryAsset } = useAppSelector(marketSelector)
  const [showPrimaryAssetModal, setShowPrimaryAssetModal] = useState<boolean>()
  const [showSecondaryAssetModal, setShowSecondaryAssetModal] = useState<boolean>()


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

  useEffect(() => {
    page.setLoading(false)
  }, [])

  return (
    <Page title={t("buying")}>
      <Row>
        <FilterBlock title={t("buying-asset")} value={primaryAsset?.meta?.symbol || t("all")} onClick={buyingAssetHandler} withIcon />
        <FilterBlock title={t("given-asset")} value={secondaryAsset?.meta?.symbol || t("all")} onClick={givingAssetHandler} withIcon />
        <FilterBlock title="Amount" className="amount-block">
          <input type="string" className="amount-filter" placeholder="0" />
        </FilterBlock>
      </Row>
      
      {showPrimaryAssetModal && <AssetsModal assets={assets} onSelect={onPrimaryAssetSelect} title={t("buying-asset")} onClose={buyingAssetHandler} />}
      {showSecondaryAssetModal && <AssetsModal assets={assets} onSelect={onSecondaryAssetSelect} title={t("given-asset")} onClose={givingAssetHandler} />}
    </Page>
  )
}

export default MarketBuy