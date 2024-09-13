import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Address, Cell } from "@ton/core";
import { selectAuthIsReady } from "features/auth/authSelector";
import {
  useLazyCancelOrderQuery,
  useLazyGetAssetsQuery,
  useLazyGetOrdersHistoryQuery,
} from "features/market/marketApi";
import { MarketModeEnum, clearOrderAssets, setAssets, setMarketMode, setWalletAssets } from "features/market/marketSlice";
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
import DropDown, { DropDownDto } from "components/ui/dropdown";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import OrdersList from "components/ui/market/OrdersList";

import "./index.css";
import { showAlert } from "features/alert/alertSlice";

const historyDropDownData: DropDownDto[] = [
  { key: "active", value: "Active" },
  { key: "history", value: "History" },
];

const Market = () => {
  const t = useLanguage("market");
  const dispatch = useAppDispatch();
  const page = usePage();
  const ton = useTon();
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
              const walletAssets = assets.filter(asset => {
                if (asset.type === "ton") {
                  return true
                }
                return data.assets.find(dAsset => (
                  Address.normalize(dAsset.meta?.address as string) === Address.normalize(asset.meta?.address as string)
                ))
              })
              const combinedAssets = [
                ...walletAssets,
                ...data?.assets.filter((a) => !walletAssets.find((wa) => (
                  wa.meta?.address &&
                  Address.normalize(wa.meta.address as string) === Address.normalize(a.meta?.address as string)
                ))),
              ] satisfies CoinDto[];
              dispatch(setWalletAssets(walletAssets))
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
    sendCancelTransaction(uuid);
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
      dispatch(showAlert({message: "Transaction was not sent", duration: 3000 }))
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
        {dropdownValue?.key === "active" && (
          <OrdersList orders={ordersActiveData} onOrderCancel={cancelOrderHandler} />
        )}
        {dropdownValue?.key === "history" && (
          <OrdersList orders={ordersHistoryData} onOrderCancel={cancelOrderHandler} />
        )}
      </Section>
    </Page>
  );
};

export default Market;
