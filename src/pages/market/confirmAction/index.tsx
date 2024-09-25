import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Cell } from "@ton/core";
import { showAlert } from "features/alert/alertSlice";
import { useLazyExecuteOrderQuery } from "features/market/marketApi";
import { marketOrdersSelector, marketSelector } from "features/market/marketSelectors";
import { MarketModeEnum } from "features/market/marketSlice";
import { CoinDto } from "types/assest";
import { MarketOrderDto } from "types/market";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useLanguage from "hooks/useLanguage";
import { useTmaMainButton } from "hooks/useTma";
import { useTon } from "hooks/useTon";
import { useTonClient } from "hooks/useTonClient";

import Page from "components/containers/Page";
import Row from "components/containers/Row";
import Section from "components/containers/Section";
import AssetIcon from "components/ui/assets/AssetIcon";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";

const ConfirmAction = () => {
  const t = useLanguage("market-order");
  const btn = useTmaMainButton();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ton = useTon();
  const { client } = useTonClient();
  const { id } = useParams();
  const { mode } = useAppSelector(marketSelector);
  const orders = useAppSelector(marketOrdersSelector);
  const [executeOrder] = useLazyExecuteOrderQuery();

  const [selectedOrder, setSelectedOrder] = useState<MarketOrderDto | undefined>();
  const [textData, setTextData] = useState<{ youSell: string; sellerInfo: string; youReceive: string } | undefined>();

  useEffect(() => {
    if (selectedOrder) {
      btn.init(t("confirm", "button"), sendTransaction, true);
    }
  }, [selectedOrder, client]);

  useEffect(() => {
    const order = orders?.find((o) => o.uuid === id);
    setSelectedOrder(order);
  }, [id, mode]);

  useEffect(() => {
    if (selectedOrder) {
      const textData =
        mode === MarketModeEnum.BUY
          ? { youSell: t("confirm-you-buy"), youReceive: t("confirm-you-pay"), sellerInfo: t("confirm-seller-info") }
          : {
              youSell: t("confirm-you-sell"),
              youReceive: t("confirm-you-receive"),
              sellerInfo: t("confirm-buyer-info"),
            };
      setTextData(textData);
    }
  }, [selectedOrder]);

  const sendTransaction = async () => {
    try {
      const response = await executeOrder({ uuid: selectedOrder?.uuid as string });
      if (response.data) {
        const txParams = response.data;
        const body = Cell.fromBase64(txParams.body);
        await ton.sender.send({
          to: txParams.to,
          value: BigInt(txParams.value),
          body,
        });
        navigate("/market", { replace: true });
      }
    } catch (error) {
      dispatch(showAlert({ message: "Transaction faild", duration: 3000 }));
    }
  };

  return (
    <Page>
      <Section title={textData?.youSell}>
        <Row>
          <AssetIcon asset={selectedOrder?.fromAsset as CoinDto} className="market-asset-icon" />
          <div className="grow">{selectedOrder?.fromAsset?.meta?.symbol}</div>
          <div>{selectedOrder?.fromValue}</div>
        </Row>
      </Section>
      <Section title={textData?.sellerInfo}>
        <ListBlock>
          <ListBaseItem className="w-full">
            <div>{t("username")}</div>
            <div>{selectedOrder?.userUsername}</div>
          </ListBaseItem>
          <ListBaseItem className="w-full">
            <div>{t("total-trades")}</div>
            <div>{selectedOrder?.userTotalOrders}</div>
          </ListBaseItem>
          <ListBaseItem className="w-full">
            <div className="grow">{t("commission", "transaction")}</div>
            <div>0.02 TON</div>
          </ListBaseItem>
          <ListBaseItem className="w-full">
            <div className="grow">{t("gas", "transaction")}</div>
            <div>~ 0.3 TON</div>
          </ListBaseItem>
        </ListBlock>
      </Section>
      <Section title={textData?.youReceive}>
        <Row>
          <AssetIcon asset={selectedOrder?.toAsset as CoinDto} className="market-asset-icon" />
          <div className="grow">{selectedOrder?.toAsset?.meta?.symbol}</div>
          <div>{selectedOrder?.toValue}</div>
        </Row>
      </Section>
    </Page>
  );
};

export default ConfirmAction;
