import React, { useEffect, useMemo, useState } from "react";

import Section from "components/containers/Section";
import useLanguage from "hooks/useLanguage";
import Block from "components/typography/Block";
import Row from "components/containers/Row";
import Column from "components/containers/Column";
import { iconMenuWalletAdd, iconMenuWalletSend } from "assets/icons/menus/wallet";
import { Link } from "react-router-dom";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import { iconMessageQuestion } from "assets/icons/globals";
import { iconButtonArraw } from "assets/icons/buttons";
import { useClosure } from "hooks/useClosure";
import { clearOrderAssets, MarketModeEnum, setMarketMode } from "features/market/marketSlice";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { usePage } from "hooks/usePage";
import Page from "components/containers/Page";
import DataLossBlock from "components/typography/DataLossBlock";
import DropDown, { DropDownDto } from "components/ui/dropdown";
import OrderHistory from "components/ui/market/OrderHistory";

import "./index.css";
import { useLazyGetOrdersHistoryQuery } from "features/market/marketApi";
import { HistoryOrderDto } from "types/market";
import { selectAuthIsReady } from "features/auth/authSelector";

const historyDropDownData: DropDownDto[] = [
  {key: "active", value: "Active"},
  {key: "history", value: "History"},
]


const Market = () => {
  const t = useLanguage("market")
  const dispatch = useAppDispatch()
  const page = usePage()
  const isReady = useAppSelector(selectAuthIsReady);
  const [getMyOrders] = useLazyGetOrdersHistoryQuery()

  const [dropdownValue, setDropdownValue] = useState<DropDownDto | undefined>()
  const [ordersHistoryData, setOrdersHistoryData] = useState<HistoryOrderDto[]>([])
  const [ordersActiveData, setOrdersActiveData] = useState<HistoryOrderDto[]>([])

  useEffect(() => {
    dropdownChangeHandler()
    page.setLoading(false, true)
  }, [])

  useEffect(() => {
    if (isReady) {
      getMyOrders(undefined).then((myOrders) => {
        const historyOrders = myOrders.data?.items?.filter(order => order.status !== "created")
        const activeOrders = myOrders.data?.items?.filter(order => order.status === "created")
        setOrdersHistoryData(historyOrders || [])
        setOrdersActiveData(activeOrders || [])
      })
    }
  }, [isReady])

  const marketActionHandler = useClosure((mode: MarketModeEnum) => {
    dispatch(setMarketMode(mode))
    dispatch(clearOrderAssets())
  })

  const myAdsHandler = () => {}

  const createAdHandler = () => {}

  const dropdownChangeHandler = (d?: DropDownDto) => {
    if (!d) {
      setDropdownValue(historyDropDownData[0])
    } else if (d !== dropdownValue) {
      setDropdownValue(d)
    }
  }

  const getHistoryDropdown = useMemo(() => {
    return (
      <DropDown 
        className="right" 
        onChange={dropdownChangeHandler} 
        data={historyDropDownData} defaultValue={dropdownValue} 
      />
    )
  }, [dropdownChangeHandler, historyDropDownData, dropdownValue])

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
              <Link to="create-order" className="new-ad-btn" onClick={createAdHandler}>{t("create-order")}</Link>
            </ListBaseItem>
          </ListBlock>
        </Column>
      </Section>
      <Section title={t("my-orders")} readMore={getHistoryDropdown}>
        {!ordersActiveData && <DataLossBlock>{t("my-orders-hint")}</DataLossBlock>}
        {dropdownValue?.key === "active" && ordersActiveData?.length > 0 && <OrderHistory history={ordersActiveData} />}
        {dropdownValue?.key === "history" && ordersHistoryData?.length > 0 && <OrderHistory history={ordersHistoryData} />}
      </Section>
    </Page>
  )
}

export default Market