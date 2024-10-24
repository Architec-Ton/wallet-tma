import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import { selectAuthIsReady } from "features/auth/authSelector";
import {
  marketAssets,
  marketModeSelector,
  marketWalletAssets,
  orderPrimaryAssetSelector,
  orderSecondaryAssetSelector,
} from "features/market/marketSelectors";
import {
  MarketModeEnum,
  clearOrderAssets,
  setMarketMode,
  setOrderPrimaryAsset,
  setOrderSecondaryAsset,
  setOrderValues,
} from "features/market/marketSlice";
import { CoinDto } from "types/assest";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import { useTmaMainButton } from "hooks/useTma";

import Page from "components/containers/Page";
import Row from "components/containers/Row";
import Section from "components/containers/Section";
import AssetIcon from "components/ui/assets/AssetIcon";
import SelectButton from "components/ui/buttons/selectButton";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import AssetsModal from "components/ui/market/modals/AsetsModal";
import Tabs from "components/ui/tabs";
import Tab from "components/ui/tabs/Tab";

import "./index.css";

const CreateMarketOrder = () => {
  const t = useLanguage("market-order-form");
  const dispatch = useAppDispatch();
  const btn = useTmaMainButton();
  const navigate = useNavigate();
  const page = usePage();

  const orderMode = useAppSelector(marketModeSelector);
  const fromAsset = useAppSelector(orderPrimaryAssetSelector);
  const toAsset = useAppSelector(orderSecondaryAssetSelector);
  const assets = useAppSelector(marketAssets);
  const [showAssetsModal, setShowAssetsModal] = useState<boolean>(false);
  const [assetsModalTitle, setAssetsModalTitle] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<"primary" | "secondary" | undefined>();
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");
  const walletAssets = useAppSelector(marketWalletAssets);
  const isReady = useAppSelector(selectAuthIsReady);

  useEffect(() => {
    page.setNavbarVisible(false);
  }, []);

  useEffect(() => {
    if (isReady) {
      if (!assets && !walletAssets) {
        navigate("/market", { replace: true });
      } else {
        page.setLoading(false);
      }
    }
  }, [isReady]);

  useEffect(() => {
    if (assets) {
      if (!fromAsset) {
        dispatch(setOrderPrimaryAsset(assets[0]));
      }
      if (!toAsset) {
        dispatch(setOrderSecondaryAsset(assets[1]));
      }
    }
  }, [assets]);

  const isValid = useMemo(() => {
    if (fromAsset && toAsset) {
      return orderMode === MarketModeEnum.SELL
        ? Number(fromValue) > 0 && Number(fromValue) <= fromAsset.amount && Number(toValue) > 0
        : Number(toValue) > 0 && Number(toValue) <= toAsset.amount && Number(fromValue) > 0;
    }
  }, [fromAsset, toAsset, fromValue, toValue]);

  useEffect(() => {
    if (isValid) {
      btn.init(
        t("create-ad", "market"),
        () => {
          dispatch(
            setOrderValues({
              fromValue: Number(fromValue),
              toValue: Number(toValue),
            }),
          );
          navigate("confirm");
        },
        true,
      );
      btn.setVisible(true);
    } else {
      btn.setVisible(false);
    }
  }, [isValid, fromValue, toValue]);

  const assetLabels = {
    sell: {
      "sell-asset": t("sell-asset"),
      "receive-asset": t("receive-asset"),
      "sell-amount": t("sell-amount"),
      "receive-amount": t("receive-amount"),
    },
    buy: {
      "sell-asset": t("buy-asset"),
      "receive-asset": t("given-asset"),
      "sell-amount": t("purchase-amount"),
      "receive-amount": t("given-amount"),
    },
  };

  const selectPrimaryAsset = () => {
    setAssetsModalTitle(assetLabels[orderMode]["sell-asset"]);
    setSelectedAsset("primary");
    setShowAssetsModal(true);
  };

  const selectReceiveAsset = () => {
    setAssetsModalTitle(assetLabels[orderMode]["receive-asset"]);
    setSelectedAsset("secondary");
    setShowAssetsModal(true);
  };

  const onAssetSelect = useCallback(
    (asset?: CoinDto) => {
      if (selectedAsset === "primary") {
        dispatch(setOrderPrimaryAsset(asset));
      } else {
        dispatch(setOrderSecondaryAsset(asset));
      }
      setShowAssetsModal(false);
    },
    [selectedAsset],
  );

  const changeModeToSell = () => {
    dispatch(setMarketMode(MarketModeEnum.SELL));
  };

  const changeModeToBuy = () => {
    dispatch(setMarketMode(MarketModeEnum.BUY));
  };

  const primaryValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.endsWith(",") || e.currentTarget.value.endsWith(".")) {
      setFromValue(e.currentTarget.value)
      return
    }

    const value = Number(e.currentTarget.value.replace(",", "."));
    if (!isNaN(value) && value > 0) {
      const decimalsLength = Math.pow(10, Number(fromAsset?.meta?.decimals))
      setFromValue((Math.round(value * decimalsLength) / decimalsLength).toString());
    } else {
      setFromValue("");
    }
  };

  const secondaryValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.endsWith(",") || e.currentTarget.value.endsWith(".")) {
      setFromValue(e.currentTarget.value)
      return
    }
    
    const value = Number(e.currentTarget.value.replace(",", "."));
    if (!isNaN(value) && value > 0) {
      const decimalsLength = Math.pow(10, Number(toAsset?.meta?.decimals))
      setToValue((Math.round(value * decimalsLength) / decimalsLength).toString());
    } else {
      setToValue("");
    }
  };

  const modalAssets = useMemo(() => {
    if (orderMode === MarketModeEnum.BUY) {
      return selectedAsset === "primary"
        ? assets?.filter((a) => a.meta?.name.toLowerCase() !== toAsset?.meta?.name.toLowerCase())
        : walletAssets?.filter((a) => a.meta?.name.toLowerCase() !== fromAsset?.meta?.name.toLowerCase());
    } else {
      return selectedAsset === "primary"
        ? walletAssets?.filter((a) => a.meta?.name.toLowerCase() !== toAsset?.meta?.name.toLowerCase())
        : assets?.filter((a) => a.meta?.name.toLowerCase() !== fromAsset?.meta?.name.toLowerCase());
    }
  }, [orderMode, assets, fromAsset, toAsset, selectedAsset]);

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
              <SelectButton className="uppercase-text" onClick={selectPrimaryAsset} placeHolder="Select">
                {fromAsset?.meta?.name}
              </SelectButton>
            </Row>
          </ListBaseItem>
          <ListBaseItem>
            <Row className="order-data-row grow">
              <div>{assetLabels[orderMode]["receive-asset"]}</div>
              <SelectButton className="uppercase-text" onClick={selectReceiveAsset} placeHolder="Select">
                {toAsset?.meta?.name}
              </SelectButton>
            </Row>
          </ListBaseItem>
        </ListBlock>
      </Section>
      <Section title={assetLabels[orderMode]["sell-amount"]}>
        <ListBlock>
          <ListBaseItem>
            <Row className="grow market-asset-info">
              <AssetIcon asset={fromAsset} className="market-asset-icon" />
              <div className="grow">{fromAsset?.meta?.name}</div>
              <div className="secondary-content">
                <input
                  className={classNames("order-asset-input", {
                    error: orderMode === MarketModeEnum.SELL && Number(fromValue) > Number(fromAsset?.amount || 0),
                  })}
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9.,]"
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
              <div>{fromAsset?.amount || 0}</div>
            </Row>
          </ListBaseItem>
        </ListBlock>
      </Section>
      <Section title={assetLabels[orderMode]["receive-amount"]}>
        <ListBlock>
          <ListBaseItem>
            <Row className="grow market-asset-info">
              <AssetIcon asset={toAsset} className="market-asset-icon" />
              <div className="grow">{toAsset?.meta?.name}</div>
              <div className="secondary-content">
                <input
                  className={classNames("order-asset-input", {
                    error: orderMode === MarketModeEnum.BUY && Number(toValue) > Number(toAsset?.amount || 0),
                  })}
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9.,]"
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
              <div>{toAsset?.amount || 0}</div>
            </Row>
          </ListBaseItem>
        </ListBlock>
      </Section>
      {showAssetsModal && (
        <AssetsModal
          assets={modalAssets as CoinDto[]}
          onSelect={onAssetSelect}
          title={assetsModalTitle}
          onClose={() => setShowAssetsModal(false)}
        />
      )}
    </Page>
  );
};

export default CreateMarketOrder;
