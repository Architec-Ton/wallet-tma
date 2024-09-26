import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Address, Cell } from "@ton/core";
import { showWarningAlert } from "features/alert/alertSlice";
import { selectAuthIsReady } from "features/auth/authSelector";
import {
  useLazyCancelOrderQuery,
  useLazyGetAssetsQuery,
  useLazyGetOrdersHistoryQuery,
} from "features/market/marketApi";
import {
  MarketModeEnum,
  clearOrderAssets,
  setAssets,
  setMarketMode,
  setWalletAssets,
} from "features/market/marketSlice";
import { selectIsTma } from "features/tma/tmaSelector";
import { selectIsTonLoading, selectTonMode } from "features/ton/tonSelector";
import { TonConnectionMode } from "features/ton/tonSlice";
import { useApiWalletInfoMutation } from "features/wallet/walletApi";
import { type CoinDto } from "types/assest";
import { type MarketOrderDto, OrderStatus } from "types/market";
import { type WalletInfoData } from "types/wallet";

import { iconButtonArraw } from "assets/icons/buttons";
import { iconMessageQuestion } from "assets/icons/globals";
import { iconMenuWalletAdd, iconMenuWalletSend } from "assets/icons/menus/wallet";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { useClosure } from "hooks/useClosure";
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import { useTmaPopup } from "hooks/useTmaPopup";
import { useTon } from "hooks/useTon";
import useTrxModalManagement from "hooks/useTon/useTrxModalManagment";

import Column from "components/containers/Column";
import Page from "components/containers/Page";
import Row from "components/containers/Row";
import Section from "components/containers/Section";
import Block from "components/typography/Block";
import DropDown from "components/ui/dropdown";
import { type DropDownDto } from "components/ui/dropdown";
import LinkRow from "components/ui/linkRow";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import OrdersList from "components/ui/market/OrdersList";

import "./index.css";
import InfiniteScroll from "react-infinite-scroller";
import InlineLoader from "components/ui/inlineLoader";

const historyDropDownData: DropDownDto[] = [
  { key: "active", value: "Active" },
  { key: "history", value: "History" },
];

const POLLING_INTERVAL = 5000;
const MY_ORDER_PAGE_SIZE = 30

const Market = () => {
  const [dropdownValue, setDropdownValue] = useState<DropDownDto | undefined>();
  const [ordersHistoryData, setOrdersHistoryData] = useState<MarketOrderDto[]>([]);
  const [ordersActiveData, setOrdersActiveData] = useState<MarketOrderDto[]>([]);
  const [pollingInterval, setPollingInterval] = useState<number>(0);
  const [isHistoryEnd, setIsHistoryEnd] = useState<boolean>(false);
  const [nextHistoryPage, setNextHistoryPage] = useState<number>(1)
  const [isActiveEnd, setIsActiveEnd] = useState<boolean>(false);
  const [nextActivePage, setNextActivePage] = useState<number>(1)

  const t = useLanguage("market");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myOrdersPollingStatus = useRef(false);
  const myHistoryFetchingRef = useRef(false);
  const myActiveFetchingRef = useRef(false);
  const page = usePage();
  const ton = useTon();
  const isReady = useAppSelector(selectAuthIsReady);
  const isTma = useAppSelector(selectIsTma);
  const popup = useTmaPopup();
  const trxModal = useTrxModalManagement();
  const isTonLoading = useAppSelector(selectIsTonLoading);
  const tonMode = useAppSelector(selectTonMode);

  const [getMyActiveOrders, { data: myActiveOrders, isFetching }] = useLazyGetOrdersHistoryQuery({
    pollingInterval,
    skipPollingIfUnfocused: true,
    selectFromResult: (result) => {
      const startPolling = !!result.data?.items.find((order) =>
        [OrderStatus.CANCELING, OrderStatus.CREATED, OrderStatus.EXECUTING].includes(order.status),
      );
      if (startPolling) {
        myOrdersPollingStatus.current = true;
      } else {
        myOrdersPollingStatus.current = false;
      }
      return result;
    },
  });
  const [getMyHistoryOrders] = useLazyGetOrdersHistoryQuery();
  const [cancelOrderApi] = useLazyCancelOrderQuery();
  const [walletInfoApi] = useApiWalletInfoMutation();
  const [getAssets] = useLazyGetAssetsQuery();

  useEffect(() => {
    if (!isTonLoading) {
      if (tonMode === TonConnectionMode.disconnect) {
        navigate("/registration/welcome");
      } else {
        dropdownChangeHandler();
        page.setLoading(false, true);
      }
    }
  }, [isTonLoading, tonMode, isReady]);

  useEffect(() => {
    if (myOrdersPollingStatus.current) {
      setPollingInterval(POLLING_INTERVAL);
    } else {
      setPollingInterval(0);
    }
  }, [myOrdersPollingStatus.current]);

  useEffect(() => {
    if (myActiveOrders?.items && !isFetching) {
      const activeOrders = ordersActiveData.map((o) => `${o.uuid}--${o.status}`);
      const newActiveOrders = myActiveOrders.items.map((o) => `${o.uuid}--${o.status}`);
      const needHistoryUpdate =
        (activeOrders.length === newActiveOrders.length && newActiveOrders.find((no) => !activeOrders.includes(no))) ||
        activeOrders.length !== newActiveOrders.length;

      setOrdersActiveData(myActiveOrders.items);

      if (trxModal.isOpened) {
        setTimeout(() => {
          trxModal.confirm(undefined);
        }, 10000);
      }
      if (needHistoryUpdate) {
        setIsHistoryEnd(false)
        setOrdersHistoryData([])
        setNextHistoryPage(1)
      }
    }
  }, [myActiveOrders, isFetching, ordersActiveData, trxModal, getMyHistoryOrders]);

  useEffect(() => {
    if (isReady) {
      walletInfoApi(null)
        .unwrap()
        .then((result: WalletInfoData) => {
          const { assets } = result.wallets[result.currentWallet];
          getAssets(undefined).then(({ data }) => {
            if (data?.assets) {
              const walletAssets = assets.filter((asset) => {
                if (asset.type === "ton") {
                  return true;
                }
                return data.assets.find(
                  (dAsset) =>
                    dAsset.meta?.address &&
                    Address.normalize(dAsset.meta?.address as string) ===
                      Address.normalize(asset.meta?.address as string),
                );
              });
              const dataAssets =
                data?.assets.reduce((acc, a) => {
                  const walletAsset = walletAssets.find((wa) => {
                    if (a.type === "ton") {
                      return true;
                    }
                    return (
                      wa.meta?.address &&
                      Address.normalize(wa.meta.address as string) === Address.normalize(a.meta?.address as string)
                    );
                  });

                  if (walletAsset) {
                    acc.push({
                      ...a,
                      amount: walletAsset.amount,
                    });
                  } else {
                    acc.push(a);
                  }
                  return acc;
                }, [] as CoinDto[]) || [];
              dispatch(setWalletAssets(walletAssets));
              dispatch(setAssets(dataAssets));
            }
            page.setLoading(false, true);
          });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [isReady]);

  const fetchMyActiveOrders = useCallback(
    async() => {
      if (myActiveFetchingRef.current) {
        return
      }
      myActiveFetchingRef.current = true

      const { data } = await getMyActiveOrders({ status: "active", page: nextActivePage, size: MY_ORDER_PAGE_SIZE })
      if (data) {
        const { page, items, pages } = data
        setOrdersActiveData(activeOrders => [...activeOrders, ...items])
        setNextActivePage(page + 1)
        setIsActiveEnd(page === pages)
      }

      myActiveFetchingRef.current = false
    },
    [nextActivePage]
  )

  const fetchMyHistoryOrders = useCallback(
    async() => {
      if (myHistoryFetchingRef.current) {
        return
      }
      myHistoryFetchingRef.current = true

      const { data } = await getMyHistoryOrders({ status: "history", page: nextHistoryPage, size: MY_ORDER_PAGE_SIZE })
      if (data) {
        const { page, items, pages } = data
        setOrdersHistoryData(historyOrders => [...historyOrders, ...items])
        setNextHistoryPage(page + 1)
        setIsHistoryEnd(page === pages)
      }

      myHistoryFetchingRef.current = false
    },
    [nextHistoryPage]
  )

  const marketActionHandler = useClosure((mode: MarketModeEnum) => {
    dispatch(setMarketMode(mode));
    dispatch(clearOrderAssets());
  });

  const dropdownChangeHandler = useCallback(
    (d?: DropDownDto) => {
      if (!d) {
        setDropdownValue(historyDropDownData[0]);
      } else if (d !== dropdownValue) {
        setDropdownValue(d);
      }
    },
    [dropdownValue],
  );

  const getHistoryDropdown = useMemo(
    () => (
      <DropDown
        className="right"
        onChange={dropdownChangeHandler}
        data={historyDropDownData}
        defaultValue={dropdownValue}
      />
    ),
    [dropdownChangeHandler, dropdownValue],
  );

  const cancelOrderHandler = (uuid: string) => {
    if (isTma) {
      popup.init(
        {
          message: t("cancel-popup-message"),
          buttons: [{ type: "cancel" }, { type: "destructive", id: "confirm", text: t("cancel-confirm") }],
        },
        (buttonId) => {
          if (buttonId === "confirm") {
            sendCancelTransaction(uuid);
          }
        },
      );
    } else {
      sendCancelTransaction(uuid);
    }
  };

  const sendCancelTransaction = async (uuid: string) => {
    try {
      const response = await cancelOrderApi({ uuid });
      if (response.data) {
        const txParams = response.data;
        const body = Cell.fromBase64(txParams.body);

        await ton.sender.send({
          value: BigInt(txParams.value),
          to: txParams.to,
          body,
        });
        setIsActiveEnd(false)
        setNextActivePage(1)
        setIsHistoryEnd(false)
        setNextHistoryPage(1)
      }
    } catch (e) {
      dispatch(showWarningAlert({ message: "Cancel failed. Try again later.", duration: 3000 }));
    }
  };

  return (
    <Page>
      <Section title={t("page-title")}>
        <Column>
          <Block>
            <Row className="market-menu">
              <Link to="order" onClick={marketActionHandler(MarketModeEnum.BUY)}>
                <Column className="market-menu-item">
                  <img src={iconMenuWalletAdd} alt="" />
                  <span>{t("buy")}</span>
                </Column>
              </Link>
              <Link to="order" onClick={marketActionHandler(MarketModeEnum.SELL)}>
                <Column className="market-menu-item">
                  <img src={iconMenuWalletSend} alt="" />
                  <span>{t("sell")}</span>
                </Column>
              </Link>
            </Row>
          </Block>
          <ListBlock>
            <ListBaseItem>
              <LinkRow className="grow" to="https://t.me/architecton_support">
                <img src={iconMessageQuestion} className="block-row-icon" alt="" />
                <div className="grow">
                  <div className="ads-block-title">{t("help-title")}</div>
                  <div className="ads-block-hint">{t("help-description")}</div>
                </div>
                <img src={iconButtonArraw} alt="" className="icon-color-secondary" />
              </LinkRow>
            </ListBaseItem>
            <ListBaseItem className="center">
              <Link to="create-order" className="new-ad-btn">
                {t("create-order")}
              </Link>
            </ListBaseItem>
          </ListBlock>
        </Column>
      </Section>
      <Section title={t("my-orders")} readMore={getHistoryDropdown}>
        {dropdownValue?.key === "active" && (
          <InfiniteScroll
            loadMore={fetchMyActiveOrders}
            hasMore={ !isActiveEnd }
            loader={<center><InlineLoader /></center>}
          >
            <OrdersList orders={ordersActiveData} onOrderCancel={cancelOrderHandler} />
          </InfiniteScroll>
        )}
        {dropdownValue?.key === "history" && (
          <InfiniteScroll
            loadMore={fetchMyHistoryOrders}
            hasMore={ !isHistoryEnd }
            loader={<center><InlineLoader /></center>}
          >
            <OrdersList orders={ordersHistoryData} onOrderCancel={cancelOrderHandler} />
          </InfiniteScroll>
        )}
      </Section>
    </Page>
  );
};

export default Market;
