import React, { useEffect, useMemo, useRef, useState } from "react";

import classNames from "classnames";
import { formatDate } from "date-fns";
import { showAlert } from "features/alert/alertSlice";
import { type MarketOrderDto, OrderStatus } from "types/market";

import { clockIcon, closeIcon, copyIcon, tickIcon } from "assets/icons/pages/market";

import { useAppDispatch } from "hooks/useAppDispatch";
import useLanguage from "hooks/useLanguage";

import Column from "components/containers/Column";
import Row from "components/containers/Row";

import AssetIcon from "../assets/AssetIcon";
import InlineLoader from "../inlineLoader";
import ListBlock from "../listBlock";
import ListBaseItem from "../listBlock/ListBaseItem";
import "./OrderCard.styles.css";

type OwnPropsType = {
  order: MarketOrderDto;
  isActive?: boolean;
  disabled?: boolean;
  onCancel: (uuid: string) => void;
};

export type OrderDataType = MarketOrderDto & {
  date: string;
  time: string;
  isActive: boolean;
  isDone: boolean;
  isCanceled: boolean;
  isExecuting: boolean;
  isExpired: boolean;
};

const ORDER_EXPIRED_TIME = 1 * 60000;

const MarketOrderCard = ({ order, isActive = false, disabled, onCancel }: OwnPropsType) => {
  const t = useLanguage("market-order");
  const dispatch = useAppDispatch();
  const timer = useRef<NodeJS.Timeout>();
  const [time, setTime] = useState<number>(0);

  const orderData = useMemo<OrderDataType | undefined>(() => {
    if (order) {
      const { createdAt } = order;
      return {
        ...order,
        fromAsset: order.isOwner ? order.fromAsset : order.toAsset,
        toAsset: order.isOwner ? order.toAsset : order.fromAsset,
        fromValue: order.isOwner ? order.fromValue : order.toValue,
        toValue: order.isOwner ? order.toValue : order.fromValue,
        date: formatDate(new Date(createdAt).toString(), "dd MMMM yyyy"),
        time: formatDate(new Date(createdAt).toString(), "HH:mm:ss"),
        isActive: order?.status === OrderStatus.ACTIVE,
        isDone: order?.status === OrderStatus.FINISHED,
        isExecuting: [OrderStatus.EXECUTING, OrderStatus.CANCELING].includes(order?.status),
        isCanceled: order?.status === OrderStatus.CANCELED,
        isExpired: order?.status === OrderStatus.EXPIRED
      };
    }
    return undefined;
  }, [order]);

  useEffect(() => {
    if (orderData) {
      const timeDelta = Date.now() - new Date(orderData.createdAt).valueOf();
      const remainingTime = Math.floor((ORDER_EXPIRED_TIME - timeDelta) / 1000);
      if (remainingTime > 0) {
        setTime(remainingTime);
      }
    }
  }, [orderData]);

  useEffect(() => {
    if (time > 0) {
      timer.current = setTimeout(() => {
        setTime((t) => t - 1);
      }, 1000);
      return () => {
        clearTimeout(timer.current);
      };
    } else {
      clearTimeout(timer.current);
    }
  }, [time]);

  const formatTimer = (pattern: string) => {
    const minutes: number | string = Math.floor(time / 60);
    let seconds: number | string = time % 60;

    if (seconds < 10) seconds = `0${seconds}`;
    let timeString =
      pattern.search("ii") !== -1 ? pattern.replace("ii", `0${minutes}`) : pattern.replace("i", minutes.toString());
    timeString = timeString.replace("ss", seconds.toString());

    return timeString;
  };

  const copyHandler = () => {
    navigator.clipboard
      .writeText(order.uuid)
      .then(() => {
        dispatch(showAlert({ message: "copy", duration: 1500 }));
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  if (!orderData) {
    return null;
  }

  return (
    <ListBlock
      className={classNames("market-order-card", {
        "own-order": orderData.isOwner && (orderData.isDone || orderData.isCanceled),
      })}
    >
      <ListBaseItem>
        <Row className="justify-between grow">
          <Row className="order-status-row">
            <div>Order</div>
            <div className="order-id">{`#${order.uuid}`}</div>
            <div onClick={copyHandler} role="presentation">
              <img src={copyIcon} alt="" />
            </div>
          </Row>
          <div>
            {orderData.isDone && (
              <Row className="order-finally-status">
                <div>{t("done", "market-order-status")}</div>
                <img src={tickIcon} alt="" />
              </Row>
            )}
            {orderData.isCanceled && (
              <Row className="order-finally-status">
                <div>{t("canceled", "market-order-status")}</div>
                <img src={closeIcon} alt="" />
              </Row>
            )}
            {(orderData.isActive || orderData.status === OrderStatus.CREATED) && (
              <button
                className="small-button rounded-button primary-button timer-button"
                onClick={() => onCancel(orderData.uuid)}
                disabled={disabled || time > 0}
              >
                {(time > 0 && formatTimer("i:ss")) || t("cancel")}
              </button>
            )}
            {orderData.isExecuting && (
              <Row className="order-finally-status">
                <div>
                  {(orderData.status === OrderStatus.EXECUTING && t("executing", "market-order-status")) ||
                    t("canceling", "market-order-status")}
                </div>
                <InlineLoader className="medium-loader" />
              </Row>
            )}
            {orderData.isExpired && (
              <Row className="order-finally-status">
                <div>{t("expired", "market-order-status")}</div>
                <img src={closeIcon} alt="" />
              </Row>
            )}
          </div>
        </Row>
      </ListBaseItem>
      <ListBaseItem>
        <Column className="grow">
          <Row>
            <AssetIcon asset={orderData.toAsset} className="history-asset-icon" />
            <div className="grow asset-value">
              + {orderData.toValue}
              <span className="asset-symbol">{orderData.toAsset.meta?.symbol}</span>
            </div>
          </Row>
          <Row>
            <AssetIcon asset={orderData.fromAsset} className="history-asset-icon" />
            <div className="grow asset-value">
              - {orderData.fromValue}
              <span className="asset-symbol">{orderData.fromAsset.meta?.symbol}</span>
            </div>
          </Row>
        </Column>
      </ListBaseItem>
      <ListBaseItem>
        <Column className="w-full">
          <Row className="order-data-row">
            <div>{t("labels-type")}</div>
            <div className="grow">{t(`type-${orderData?.type}`)}</div>
          </Row>
          <Row className="order-data-row">
            <div>{t("labels-date")}</div>
            <div>{orderData?.date}</div>
          </Row>
          {orderData && orderData.isActive && (
            <Row className="order-data-row">
              <div>{t("labels-status")}</div>
              <div className="order-status">{orderData?.status}</div>
            </Row>
          )}
          {orderData && !orderData.isActive && (
            <Row className="order-data-row">
              <div>{t("labels-time")}</div>
              <div>{orderData?.time}</div>
            </Row>
          )}
        </Column>
      </ListBaseItem>
      {time > 0 && (
        <ListBaseItem>
          <Row className="order-data-row w-full">
            <Row className="w-auto">
              <div>{t("labels-unlock")}</div>
              <img src={clockIcon} alt="" />
            </Row>
            <div>{formatTimer("i m ss s")}</div>
          </Row>
        </ListBaseItem>
      )}
    </ListBlock>
  );
};

export default MarketOrderCard;
