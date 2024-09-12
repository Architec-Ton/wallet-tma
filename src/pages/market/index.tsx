import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { usePopup } from "@tma.js/sdk-react";
import { Cell } from "@ton/core";
import { selectAuthIsReady } from "features/auth/authSelector";
import {
  useLazyCancelOrderQuery,
  useLazyGetAssetsQuery,
  useLazyGetOrdersHistoryQuery,
} from "features/market/marketApi";
import { MarketModeEnum, clearOrderAssets, setAssets, setMarketMode } from "features/market/marketSlice";
import { selectIsTma } from "features/tma/tmaSelector";
import { useApiWalletInfoMutation } from "features/wallet/walletApi";
import { CoinDto } from "types/assest";
import { MarketOrderDto, OrderStatus } from "types/market";
import { WalletInfoData } from "types/wallet";

import { iconButtonArraw } from "assets/icons/buttons";
import { iconMessageQuestion } from "assets/icons/globals";
import { iconMenuWalletAdd, iconMenuWalletSend } from "assets/icons/menus/wallet";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { useClosure } from "hooks/useClosure";
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import { useTon } from "hooks/useTon";

import Column from "components/containers/Column";
import Page from "components/containers/Page";
import Row from "components/containers/Row";
import Section from "components/containers/Section";
import Block from "components/typography/Block";
import DataLossBlock from "components/typography/DataLossBlock";
import DropDown, { DropDownDto } from "components/ui/dropdown";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import OrdersList from "components/ui/market/OrdersList";

import "./index.css";

const historyDropDownData: DropDownDto[] = [
  { key: "active", value: "Active" },
  { key: "history", value: "History" },
];

const Market = () => {
  const t = useLanguage("market");
  const dispatch = useAppDispatch();
  const page = usePage();
  const ton = useTon();
  const webappPopup = usePopup();
  const isReady = useAppSelector(selectAuthIsReady);
  const isTma = useAppSelector(selectIsTma);
  const [getMyOrders] = useLazyGetOrdersHistoryQuery();
  const [cancelOrderApi] = useLazyCancelOrderQuery();
  const [walletInfoApi] = useApiWalletInfoMutation();
  const [getAssets] = useLazyGetAssetsQuery();

  const [dropdownValue, setDropdownValue] = useState<DropDownDto | undefined>();
  const [ordersHistoryData, setOrdersHistoryData] = useState<MarketOrderDto[]>([]);
  const [ordersActiveData, setOrdersActiveData] = useState<MarketOrderDto[]>([]);

  useEffect(() => {
    dropdownChangeHandler();
    page.setLoading(false, true);
  }, []);

  useEffect(() => {
    if (isReady) {
      getOrders();
      walletInfoApi(null)
        .unwrap()
        .then((result: WalletInfoData) => {
          const { assets } = result.wallets[result.currentWallet];
          getAssets(undefined).then(({ data }) => {
            if (data?.assets) {
              const combinedAssets = [
                ...assets,
                ...data?.assets.filter((a) => !assets.find((wa) => wa.meta?.symbol === a.meta?.symbol)),
              ] satisfies CoinDto[];
              dispatch(setAssets(combinedAssets));
            }
            page.setLoading(false, true);
          });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [isReady]);

  const getOrders = () => {
    console.log("getOrders");
    getMyOrders(undefined).then((myOrders) => {
      const historyOrders = myOrders.data?.items?.filter(
        (order: MarketOrderDto) => order.status !== OrderStatus.CREATED,
      );
      const activeOrders = myOrders.data?.items?.filter(
        (order: MarketOrderDto) => order.status === OrderStatus.CREATED,
      );
      setOrdersHistoryData(historyOrders || []);
      setOrdersActiveData(activeOrders || []);
    });
  };

  const marketActionHandler = useClosure((mode: MarketModeEnum) => {
    dispatch(setMarketMode(mode));
    dispatch(clearOrderAssets());
  });

  const myAdsHandler = () => {};

  const createAdHandler = () => {};

  const dropdownChangeHandler = (d?: DropDownDto) => {
    if (!d) {
      setDropdownValue(historyDropDownData[0]);
    } else if (d !== dropdownValue) {
      setDropdownValue(d);
    }
  };

  const getHistoryDropdown = useMemo(() => {
    return (
      <DropDown
        className="right"
        onChange={dropdownChangeHandler}
        data={historyDropDownData}
        defaultValue={dropdownValue}
      />
    );
  }, [dropdownChangeHandler, historyDropDownData, dropdownValue]);

  const cancelOrderHandler = (uuid: string) => {
    if (isTma) {
      webappPopup
        .open({
          message: t("cancel-popup-message"),
          buttons: [{ type: "cancel" }, { type: "destructive", text: t("cancel-confirm"), id: "confirmBtn" }],
        })
        .then((buttonId) => {
          if (buttonId === "confirmBtn") {
            sendCancelTransaction(uuid);
          }
        });
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
          value: txParams.value,
          to: txParams.to,
          body: body,
        });
        getOrders();
      }
    } catch (e) {
      console.error(e);
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
              <Row className="grow" onClick={myAdsHandler}>
                <img src={iconMessageQuestion} className="block-row-icon" alt="" />
                <div className="grow">
                  <div className="ads-block-title">{t("help-title")}</div>
                  <div className="ads-block-hint">{t("help-description")}</div>
                </div>
                <img src={iconButtonArraw} alt="" className="icon-color-secondary" />
              </Row>
            </ListBaseItem>
            <ListBaseItem className="center">
              <Link to="create-order" className="new-ad-btn" onClick={createAdHandler}>
                {t("create-order")}
              </Link>
            </ListBaseItem>
          </ListBlock>
        </Column>
      </Section>
      <Section title={t("my-orders")} readMore={getHistoryDropdown}>
        {!ordersActiveData && <DataLossBlock>{t("my-orders-hint")}</DataLossBlock>}
        {dropdownValue?.key === "active" && ordersActiveData?.length > 0 && (
          <OrdersList orders={ordersActiveData} onOrderCancel={cancelOrderHandler} />
        )}
        {dropdownValue?.key === "history" && ordersHistoryData?.length > 0 && (
          <OrdersList orders={ordersHistoryData} onOrderCancel={cancelOrderHandler} />
        )}
      </Section>
    </Page>
  );
};

export default Market;
