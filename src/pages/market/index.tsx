import React, { useEffect, useMemo, useState } from "react";

import Section from "components/containers/Section";
import useLanguage from "hooks/useLanguage";
import Block from "components/typography/Block";
import Row from "components/containers/Row";
import Column from "components/containers/Column";
import { iconMenuWalletAdd, iconMenuWalletSend } from "assets/icons/menus/wallet";
import { Link } from "react-router-dom";

import "./index.css";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import { iconMessageQuestion } from "assets/icons/globals";
import { iconButtonArraw } from "assets/icons/buttons";
import { useClosure } from "hooks/useClosure";
import { MarketModeEnum, setMarketMode } from "features/market/marketSlice";
import { useAppDispatch } from "hooks/useAppDispatch";
import { usePage } from "hooks/usePage";
import Page from "components/containers/Page";
import DataLossBlock from "components/typography/DataLossBlock";
import SelectButton from "components/ui/buttons/selectButton";
import MarketOrderCard from "components/ui/market/OrderCard";
import { MarketOrderDto } from "types/market";
import DropDown, { DropDownDto } from "components/ui/dropdown";
import OrderHistory from "components/ui/market/OrderHistory";

const order: MarketOrderDto = {
  type: MarketModeEnum.BUY,
  assets: {
    primaryAsset: {
      type: "jetton",
      amount: 100,
      usdPrice: 1,
      changePrice: 1.1,
      meta: {
        name: "BNK",
        description: "",
        address: "bnk-adress",
        url: "",
        image: "",
        imageData: "",
        decimals: 6,
        symbol: "BNK",
      }
    },
    secondaryAsset: {
      type: "jetton",
      amount: 10,
      usdPrice: 10,
      changePrice: 10.1,
      meta: {
        name: "USDT",
        description: "",
        address: "usdt-adress",
        url: "",
        image: "",
        imageData: "",
        decimals: 6,
        symbol: "USDT",
      }
    }
  },
  date: 1724238416,
  status: "Created",
  primaryValue: 10,
  secondaryValue: 90,
}

const historyDropDownData: DropDownDto[] = [
  {key: "active", value: "Active"},
  {key: "history", value: "History"},
]

const Market = () => {
  const t = useLanguage("market")
  const dispatch = useAppDispatch()
  const page = usePage()

  const [dropdownValue, setDropdownValue] = useState<DropDownDto | undefined>()

  useEffect(() => {
    dropdownChangeHandler()
    page.setLoading(false, true)
  }, [])

  const marketActionHandler = useClosure((mode: MarketModeEnum) => {
    dispatch(setMarketMode(mode))
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
              <Link to="buy" onClick={marketActionHandler(MarketModeEnum.BUY)}>
                <Column className="market-menu-item">
                  <img src={iconMenuWalletAdd} alt="" />
                  <span>{t("buy")}</span>
                </Column>
              </Link>
              <Link to="sell" onClick={marketActionHandler(MarketModeEnum.SELL)}>
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
        {!order && <DataLossBlock>{t("my-orders-hint")}</DataLossBlock>}
        {dropdownValue?.key === "active" && order && <MarketOrderCard order={order} isActive />}
        {dropdownValue?.key === "history" && <OrderHistory history={[order, order, order]} />}
      </Section>
    </Page>
  )
}

export default Market