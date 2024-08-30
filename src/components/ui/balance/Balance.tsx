import type { ReactNode } from "react";
import React, { useEffect, useMemo, useState } from "react";

import { Address as Addr } from "@ton/core";
import { showAlert } from "features/alert/alertSlice";
import { AssetKind, useLazyGetStonFiAssetQuery } from "features/stonfi/stonFiApi";
import type { CoinDto } from "types/assest";
import type { WalletInfoData } from "types/wallet";

import { iconInputScan } from "assets/icons/inputs";

import { useAppDispatch } from "hooks/useAppDispatch";
import useRouter from "hooks/useRouter";

import { parseTonTransferUrl } from "utils/formatter";

import { TON_JETTON } from "../../../constants";
import QrButton from "../../buttons/qrButton";
import Column from "../../containers/Column";
import Row from "../../containers/Row";
import Block from "../../typography/Block";
import Address from "./Address";
import "./Balance.styles.css";

type Props = {
  walletInfoData: WalletInfoData | null;
  children?: ReactNode;
};

function Balance({ children, walletInfoData }: Props) {
  const [qrText, setQrText] = useState<string | undefined>();
  const [totalAssetPrice, setTotalAssetPrice] = useState<number>(0);
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [getStonFiAsset] = useLazyGetStonFiAssetQuery();

  useEffect(() => {
    const fetchAssetPrices = async () => {
      if (walletInfoData) {
        const currentWallet = walletInfoData.wallets[walletInfoData.currentWallet];
        const assetPrices = await Promise.all(
          currentWallet.assets.map(async (asset: CoinDto) => {
            const assetAddress = asset.type === AssetKind.Ton ? TON_JETTON : asset.meta?.address;

            const { data } = await getStonFiAsset(assetAddress);
            const assetPrice = data?.asset.dex_price_usd || data?.asset.third_party_usd_price;
            const assetPriceNum = Number.isNaN(Number(assetPrice)) ? 0 : Number(assetPrice);

            return data ? assetPriceNum * asset.amount : 0;
          }),
        );

        const total = assetPrices.reduce((acc, price) => acc + price, 0);
        setTotalAssetPrice(total);
      }
    };

    fetchAssetPrices();
  }, [walletInfoData, getStonFiAsset]);

  useEffect(() => {
    try {
      if (qrText) {
        const address = parseTonTransferUrl(qrText);
        if (address) {
          Addr.parse(address);
          navigate("/send", { state: address });
        }
      }
    } catch (e) {
      dispatch(showAlert({ message: `Can not parse qr code`, duration: 8000 }));
    }
  }, [qrText]);

  const humanizedTotalAssetPrice = useMemo(() => {
    if (!walletInfoData || totalAssetPrice === undefined) return "$0";
    // HACK: используем французкий для разделения как в дизайне
    return `$${new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true,
    })
      .format(totalAssetPrice)
      .replace(/\s/g, " ")}`;
  }, [walletInfoData, totalAssetPrice]);

  return (
    <Block className="balance-block space-between">
      <Column className="w-100">
        <Row className="space-between">
          <div className="balance-block-value">{humanizedTotalAssetPrice}</div>
          <div>
            <QrButton icon={iconInputScan} onChange={(s: string | undefined) => setQrText(s)} />
          </div>
        </Row>

        {children}
      </Column>
      <Address
        address={walletInfoData ? walletInfoData.wallets[walletInfoData.currentWallet].address.toString() : undefined}
      />
    </Block>
  );
}

export default Balance;
