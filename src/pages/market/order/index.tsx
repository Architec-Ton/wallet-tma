import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLazyGetOrdersQuery } from "features/market/marketApi";
import { marketAssets, marketOrdersSelector, marketSelector } from "features/market/marketSelectors";
import { MarketModeEnum, setOrderPrimaryAsset, setOrderSecondaryAsset, setOrders } from "features/market/marketSlice";
import { CoinDto } from "types/assest";
import { MarketOrderDto, MarketOrdersDto, MarketOrdersRequestQuery, OrderStatus } from "types/market";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { useClosure } from "hooks/useClosure";
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";

import Column from "components/containers/Column";
import Page from "components/containers/Page";
import Row from "components/containers/Row";
import ResponsiveInput from "components/inputs/ResponsiveInput";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import FilterBlock from "components/ui/market/FilterBlock";
import OrderCardIcon from "components/ui/market/OrderCardIcon";
import AssetsModal from "components/ui/market/modals/AsetsModal";
import InfiniteScroll from "react-infinite-scroller";
import InlineLoader from "components/ui/inlineLoader";
import useDebounce from "hooks/useDebounce";
import DataLossBlock from "components/typography/DataLossBlock";

const PAGE_SIZE = 3

const MarketOrder = () => {
  const t = useLanguage("market");
  const page = usePage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const debounce = useDebounce();
  const fetchingRef = useRef<boolean>(false)
  const [getOrders] = useLazyGetOrdersQuery();
  const orders = useAppSelector(marketOrdersSelector);
  const assets = useAppSelector(marketAssets);
  const { fromAsset, toAsset, mode } = useAppSelector(marketSelector);
  const [showPrimaryAssetModal, setShowPrimaryAssetModal] = useState<boolean>();
  const [showSecondaryAssetModal, setShowSecondaryAssetModal] = useState<boolean>();
  const [filteredOrders, setFilteredOrders] = useState<MarketOrderDto[]>();
  const [amountValue, setAmountValue] = useState<string>("");
  const [textData, setTextData] = useState<any>();
  const [isEndPage, setIsEndPage] = useState<boolean>(false)
  const [nextPage, setNextPage] = useState<number>(1)
  const [isPageFetching, setIsPageFetching] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      dispatch(setOrders(undefined))
    }
  }, []);

  useEffect(() => {
    if (orders) {
      setFilteredOrders(orders)
    }
  }, [orders])

  useEffect(() => {
    const textData =
      mode === MarketModeEnum.BUY
        ? {
            pageTitle: t("buying"),
            primaryAssetLabel: t("buying-asset"),
            secondaryAssetLabel: t("given-asset"),
            buttonText: t("buy"),
            ownerLabel: t("seller"),
            stats: t("stats"),
          }
        : {
            pageTitle: t("selling"),
            primaryAssetLabel: t("selling-asset"),
            secondaryAssetLabel: t("receiving-asset"),
            buttonText: t("sell"),
            ownerLabel: t("buyer"),
            stats: t("stats"),
          };
    setTextData(textData);
  }, [mode]);

  const buyingAssetHandler = () => {
    setShowPrimaryAssetModal(!showPrimaryAssetModal);
  };

  const givingAssetHandler = () => {
    setShowSecondaryAssetModal(!showSecondaryAssetModal);
  };

  const onPrimaryAssetSelect = useCallback((asset: CoinDto) => {
    dispatch(setOrderPrimaryAsset(asset));
    dispatch(setOrders(undefined));
    setShowPrimaryAssetModal(false);  
    setFilteredOrders([]);
    setNextPage(1);
    setIsEndPage(false);
  }, []);

  const onSecondaryAssetSelect = useCallback((asset: CoinDto) => {
    dispatch(setOrderSecondaryAsset(asset));
    dispatch(setOrders(undefined));
    setShowSecondaryAssetModal(false);  
    setFilteredOrders([]);
    setNextPage(1);
    setIsEndPage(false);
  }, []);

  const amountChangeHandler = (value: string) => {
    const _v = Number(value);
    if (!isNaN(_v) && _v >= 0) {
      setAmountValue(value.toString());
    } else {
      setAmountValue("");
    }
    debounce(() => {
      dispatch(setOrders(undefined));  
      setFilteredOrders([]);
      setNextPage(1)
      setIsEndPage(false)
    }, 500)
  };

  useEffect(() => {
    page.setLoading(false);
  }, []);

  const orderClickHandler = useClosure((uid: string) => {
    navigate(uid);
  });

  const fetchOrdersNextPage = useCallback(
    async () => {
      if (fetchingRef.current || isPageFetching) {
        return
      }
      fetchingRef.current = true
      setIsPageFetching(true)
      
      try {
        let pageParams: MarketOrdersRequestQuery = { page: nextPage, size: PAGE_SIZE, mode }
        if (fromAsset) {
          const assetParamKey = mode === MarketModeEnum.BUY ? "from_asset" : "to_asset";
          pageParams = {...pageParams, [assetParamKey]: fromAsset.meta?.name.toLowerCase() === "ton" ? "ton": fromAsset.meta?.address }
        }
        if (toAsset) {
          const assetParamKey = mode === MarketModeEnum.SELL ? "from_asset" : "to_asset";
          pageParams = {...pageParams, [assetParamKey]: toAsset.meta?.name.toLowerCase() === "ton" ? "ton": toAsset.meta?.address }
        }
        if (amountValue && Number(amountValue) > 0) {
          pageParams = {...pageParams, from_amount: amountValue }
        }
        const { data } = await getOrders(pageParams)
        const { items, page, pages } = data as MarketOrdersDto;
        dispatch(setOrders(items));        
        setIsEndPage(page === pages || pages === 0)
        if (page < pages) {
          setNextPage(page + 1)
        }
      } catch (error) {
        setIsEndPage(true)
      }

      setIsPageFetching(false)
      fetchingRef.current = false
    },
    [isPageFetching, nextPage, fromAsset, toAsset, amountValue]
  )

  return (
    <Page title={textData?.pageTitle}>
      <Row className="orders-filter">
        <FilterBlock
          title={textData?.primaryAssetLabel}
          value={fromAsset?.meta?.name.toUpperCase() || t("all")}
          onClick={buyingAssetHandler}
          withIcon
        />
        <FilterBlock
          title={textData?.secondaryAssetLabel}
          value={toAsset?.meta?.name.toUpperCase() || t("all")}
          onClick={givingAssetHandler}
          withIcon
        />
        <FilterBlock title={t("amount")} className="amount-block">
          <ResponsiveInput onChangeHandler={amountChangeHandler} value={amountValue} />
        </FilterBlock>
      </Row>

      <InfiniteScroll
        loadMore={fetchOrdersNextPage}
        hasMore={ !isEndPage }
        loader={<center key="orders-list-loader"><InlineLoader /></center>}
      >
        <Column key="orders-list">
          {!filteredOrders?.length && <DataLossBlock>{t("no-orders-found")}</DataLossBlock>}
          {!!filteredOrders?.length && filteredOrders?.map((orderData) => (
            <ListBlock key={orderData.uuid}>
              <ListBaseItem className="market-order-card">
                <OrderCardIcon order={orderData} />
                <Column className="grow">
                  {mode === MarketModeEnum.BUY && (
                    <>
                      <div>
                        + {orderData.fromValue} {orderData.fromAsset.meta?.name}
                      </div>
                      <div className="secondary-content text-sm">
                        - {orderData.toValue} {orderData.toAsset.meta?.name}
                      </div>
                    </>
                  )}
                  {mode === MarketModeEnum.SELL && (
                    <>
                      <div>
                        - {orderData.fromValue} {orderData.fromAsset.meta?.name}
                      </div>
                      <div className="secondary-content text-sm">
                        + {orderData.toValue} {orderData.toAsset.meta?.name}
                      </div>
                    </>
                  )}
                </Column>
                <button
                  className="small-button rounded-button primary-button"
                  onClick={orderClickHandler(orderData.uuid)}
                  disabled={orderData.status !== OrderStatus.ACTIVE}
                >
                  {textData?.buttonText}
                </button>
              </ListBaseItem>
              <ListBaseItem>
                <Column className="w-full">
                  <Row className="order-data-row">
                    <div className="secondary-content">{textData?.ownerLabel}</div>
                    <div>{orderData?.userUsername}</div>
                  </Row>
                  <Row className="order-data-row">
                    <div className="secondary-content">{textData?.stats}</div>
                    <div>{t("stats-value", "", { total: orderData?.userTotalOrders })}</div>
                  </Row>
                </Column>
              </ListBaseItem>
            </ListBlock>
          ))}
        </Column>
      </InfiniteScroll>

      {showPrimaryAssetModal && (
        <AssetsModal
          assets={assets}
          onSelect={onPrimaryAssetSelect}
          title={textData?.primaryAssetLabel}
          onClose={buyingAssetHandler}
        />
      )}
      {showSecondaryAssetModal && (
        <AssetsModal
          assets={assets}
          onSelect={onSecondaryAssetSelect}
          title={textData?.secondaryAssetLabel}
          onClose={givingAssetHandler}
        />
      )}
    </Page>
  );
};

export default MarketOrder;
