import type { ChangeEventHandler } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { AddressType, AmountType } from "@ston-fi/sdk";
import { DEX, pTON } from "@ston-fi/sdk";
import { useGetStonfiAssetsQuery, useLazySimulateQuery } from "features/stonfi/stonFiApi";
import { useApiWalletInfoMutation } from "features/wallet/walletApi";
import type { CoinDto } from "types/assest";
import type { WalletInfoData } from "types/wallet";

import { iconReverseButton } from "assets/icons/buttons";

import { useClosure } from "hooks/useClosure";
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import { useTmaMainButton } from "hooks/useTma";
import { useTon } from "hooks/useTon";
import { useTonClient } from "hooks/useTonClient";

import Page from "components/containers/Page";
import Row from "components/containers/Row";
import Section from "components/containers/Section";
import Delimiter from "components/typography/Delimiter";

import AssetsList from "./assetsList";
import "./index.css";
import ReceiveAsset from "./receiveAsset";
import SendAsset from "./sendAsset";

export type AssetDataType = {
  title: string;
  icon: string;
  balance: number;
  value?: string;
  address?: string;
};

export type JetonWalletType = {
  address: string;
  balance: string;
  owner: string;
  jetton: string;
  last_transaction_lt: string;
  code_hash: string;
  data_hash: string;
};

type SwapDataType = {
  send: AssetDataType;
  receive: AssetDataType;
};

const swapData: SwapDataType = {
  send: {
    title: "",
    balance: 0,
    icon: "",
    address: "",
    value: "",
  },
  receive: {
    title: "",
    balance: 0,
    icon: "",
    address: "",
    value: "",
  } satisfies AssetDataType,
};

const testnetAssets: CoinDto[] = [
  {
    type: "jetton",
    amount: 100,
    usdPrice: Number(0.15),
    changePrice: 0,
    meta: {
      name: "TestRED",
      description: "Only for test",
      address: "kQDLvsZol3juZyOAVG8tWsJntOxeEZWEaWCbbSjYakQpuYN5",
      image: "",
      decimals: 6,
      symbol: "TestRED",
    },
  },
  {
    type: "jetton",
    amount: 100,
    usdPrice: Number(0.15),
    changePrice: 0,
    meta: {
      name: "TestBlue",
      description: "Only for test",
      address: "kQB_TOJSB7q3-Jm1O8s0jKFtqLElZDPjATs5uJGsujcjznq3",
      image: "",
      decimals: 6,
      symbol: "TestBlue",
    },
  },
];

const Swap = () => {
  const { data: stonFiAssets, isLoading } = useGetStonfiAssetsQuery(null);
  const [wallet, setWallet] = useState<string>("");
  const [swapAssets, setSwappAssets] = useState(swapData);
  const [showAssetsList, setShowAssetsList] = useState(false);
  const [swappingTokenMode, setSwappingTokenMode] = useState<"send" | "receive" | null>(null);
  const [assets, setAssets] = useState<CoinDto[] | null>(null);
  const page = usePage();
  const btn = useTmaMainButton();

  const { client: tonClient, network } = useTonClient();
  const ton = useTon();
  const [walletInfoApi] = useApiWalletInfoMutation();
  const t = useLanguage("swap");
  const navigate = useNavigate();
  const [simulationTrigger] = useLazySimulateQuery();

  useEffect(() => {
    page.setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (ton.wallet.address) {
      setWallet(ton.wallet.address.toString());
    }
  }, [ton.wallet]);

  useEffect(() => {
    walletInfoApi(null)
      .unwrap()
      .then((result: WalletInfoData) => {
        const { assets } = result.wallets[result.currentWallet];
        setAssets(assets);
        page.setLoading(false);
        btn.init(t("page-title"), swapHanler, false);
      })
      .catch((e) => {
        console.error(e);
        page.setLoading(false);
      });
  }, []);

  const combinedAssets = useMemo(() => {
    if (assets && stonFiAssets) {
      const excludeAssets: string[] = [];
      const _stonFiAssets = stonFiAssets.map((stonFiAsset) => {
        const asset = assets.find(
          (asset) => asset.meta?.symbol?.toLowerCase() === stonFiAsset?.meta?.symbol?.toLowerCase(),
        );
        if (asset) {
          excludeAssets.push(asset.meta?.symbol as string);
          return { ...stonFiAsset, amount: asset.amount };
        }
        return stonFiAsset;
      });
      const testAssets = network === "testnet" ? testnetAssets : [];
      const userAssets = assets.filter((asset) => !excludeAssets.includes(asset.meta?.symbol as string));
      const _assets: CoinDto[] = [...userAssets, ...testAssets, ..._stonFiAssets];
      return _assets;
    }
    return [] as CoinDto[];
  }, [assets, stonFiAssets, network]);

  const sendingAsset = useMemo(() => {
    if (combinedAssets.length) {
      return combinedAssets.find((asset) => asset.meta?.address === swapAssets.send.address);
    }
  }, [swapAssets, combinedAssets]);

  const receivingAsset = useMemo(() => {
    if (combinedAssets.length) {
      return combinedAssets.find((asset) => asset.meta?.address === swapAssets.receive.address);
    }
  }, [swapAssets, combinedAssets]);

  const calculateSwappValues = (value: number | string, mode: "send" | "receive") => {
    const _value = Number(value);
    if (mode === "send") {
      return receivingAsset ? (Number(sendingAsset?.usdPrice) * _value) / Number(receivingAsset?.usdPrice) : undefined;
    }
    if (mode === "receive") {
      return sendingAsset ? (Number(receivingAsset?.usdPrice) * _value) / Number(sendingAsset?.usdPrice) : undefined;
    }
  };

  const reverseSwaping = () => {
    setSwappAssets((prevData) => {
      const { send, receive } = prevData;
      return { send: receive, receive: send };
    });
  };

  const changeReceiveValue = (value: string) => {
    setSwappAssets(({ send, receive }) => {
      const sendedValue = calculateSwappValues(value, "receive") || "";
      return {
        send: { ...send, value: sendedValue?.toString() },
        receive: { ...receive, value },
      } satisfies SwapDataType;
    });
  };

  const changeReceiveHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeReceiveValue(e.currentTarget.value);
  };

  const changeSendValue = (value: string) => {
    const receivedValue = calculateSwappValues(value, "send") || "";
    setSwappAssets(
      ({ send, receive }) =>
        ({
          send: { ...send, value },
          receive: { ...receive, value: receivedValue?.toString() },
        }) satisfies SwapDataType,
    );
  };

  const changeSendHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeSendValue(e.currentTarget.value);
  };

  const chooseAssetHandler = useClosure((mode: "send" | "receive") => {
    setSwappingTokenMode(mode);
    setShowAssetsList(true);
  });

  const closeAssetsList = () => {
    setSwappingTokenMode(null);
    setShowAssetsList(false);
  };

  const setJeton = (asset: CoinDto) => {
    setSwappAssets(({ send, receive }) => {
      if (swappingTokenMode === "send") {
        const sendedValue = (Number(receivingAsset?.usdPrice) * Number(receive.value)) / asset.usdPrice || "";
        return {
          send: {
            title: asset.meta?.symbol as string,
            balance: asset.amount ?? 0,
            icon: (asset.meta?.image ||
              (asset.meta?.imageData && `data:image/png;base64, ${asset.meta?.imageData}`)) as string,
            address: asset.meta?.address,
            value: sendedValue.toString(),
          },
          receive,
        } satisfies SwapDataType;
      } else {
        const receivedValue = (Number(sendingAsset?.usdPrice) * Number(send.value)) / asset.usdPrice || "";
        return {
          send,
          receive: {
            title: asset.meta?.symbol as string,
            balance: asset.amount ?? 0,
            icon: (asset.meta?.image ||
              (asset.meta?.imageData && `data:image/png;base64, ${asset.meta?.imageData}`)) as string,
            address: asset.meta?.address,
            value: receivedValue.toString(),
          },
        } satisfies SwapDataType;
      }
    });
    setShowAssetsList(false);
  };

  const swapHanler = () => {
    transactionSuccessHandler();
  };

  const transactionParams = () => {
    const dex =
      network === "testnet"
        ? new DEX.v1.Router("kQCas2p939ESyXM_BzFJzcIe3GD5S0tbjJDj6EBVn-SPsEkN")
        : new DEX.v1.Router();

    return { dex };
  };

  const transactionSuccessHandler = async () => {
    const types = [sendingAsset?.type, receivingAsset?.type];
    try {
      if (types.includes("ton")) {
        types[0] === "ton" ? await tonToJettonTransaction() : await jettonToTonTransaction();
      } else {
        await jettonToJettonTransaction();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const simulateHandler = async () => {
    const { data } = await simulationTrigger({
      offer_address: sendingAsset?.meta?.address as string,
      ask_address: receivingAsset?.meta?.address as string,
      units: Math.round(Number(swapAssets.send.value) * 10 ** Number(sendingAsset?.meta?.decimals)),
      slippage_tolerance: "0.001",
    });
    return data;
  };

  const jettonToTonTransaction = async () => {
    if (!tonClient) {
      throw new Error("TonClient doesn't exists");
    }
    const { dex } = transactionParams();
    const router = tonClient.open(dex);

    const simulateData = await simulateHandler();
    const swapTxParams = await router.getSwapJettonToTonTxParams({
      userWalletAddress: wallet,
      offerJettonAddress: sendingAsset?.meta?.address as AddressType,
      offerAmount: simulateData?.offer_units as string,
      proxyTon: new pTON.v1(),
      minAskAmount: simulateData?.min_ask_units as string,
    });

    await ton.sender.send({
      value: swapTxParams.value,
      to: swapTxParams.to,
      body: swapTxParams.body,
    });
    navigate("/bank/buy", { replace: true });
  };

  const jettonToJettonTransaction = async () => {
    if (!tonClient) {
      throw new Error("TonClient doesn't exists");
    }
    const { dex } = transactionParams();
    const router = tonClient.open(dex);

    const simulateData = await simulateHandler();
    const swapTxParams = await router.getSwapJettonToJettonTxParams({
      userWalletAddress: wallet,
      offerJettonAddress: sendingAsset?.meta?.address as AddressType,
      offerAmount: simulateData?.offer_units as string,
      askJettonAddress: receivingAsset?.meta?.address as AddressType,
      minAskAmount: simulateData?.min_ask_units as string,
    });

    await ton.sender.send({
      value: swapTxParams.value,
      to: swapTxParams.to,
      body: swapTxParams.body,
    });
    navigate("/bank/buy", { replace: true });
  };

  const tonToJettonTransaction = async () => {
    if (!tonClient) {
      throw new Error("TonClient doesn't exists");
    }
    const { dex } = transactionParams();
    const router = tonClient.open(dex);

    const simulateData = await simulateHandler();
    const swapTxParams = await router.getSwapTonToJettonTxParams({
      userWalletAddress: wallet,
      askJettonAddress: receivingAsset?.meta?.address as AddressType,
      offerAmount: simulateData?.offer_units as AmountType,
      proxyTon: new pTON.v1(),
      minAskAmount: simulateData?.min_ask_units as AmountType,
    });

    await ton.sender.send({
      value: swapTxParams.value,
      to: swapTxParams.to,
      body: swapTxParams.body,
    });
    navigate("/bank/buy", { replace: true });
  };

  const [isValidSwapp, setIsValidSwapp] = useState<boolean>(false);

  useEffect(() => {
    const isValid: boolean =
      !!sendingAsset &&
      !!receivingAsset &&
      sendingAsset.amount > 0 &&
      sendingAsset.amount - Number(swapAssets.send.value) >= 0 &&
      !!swapAssets.send.value &&
      !!swapAssets.receive.value;
    setIsValidSwapp(isValid);
  }, [sendingAsset, receivingAsset, swapAssets]);

  useEffect(() => {
    btn.setVisible(isValidSwapp);
    if (isValidSwapp) {
      btn.refresh(swapHanler);
    }
  }, [isValidSwapp]);

  return (
    <Page title={t("page-title")} className="swap">
      <Delimiter />
      <SendAsset
        asset={swapAssets.send}
        onChange={changeSendHandler}
        forceChange={changeSendValue}
        onClick={chooseAssetHandler("send")}
        value={swapAssets.send.value || ""}
        coin={sendingAsset}
        disabled={!sendingAsset || !receivingAsset || sendingAsset.amount <= 0}
      />
      <Delimiter>
        <img src={iconReverseButton} alt="" onClick={reverseSwaping} />
      </Delimiter>
      <ReceiveAsset
        asset={swapAssets.receive}
        onChange={changeReceiveHandler}
        onClick={chooseAssetHandler("receive")}
        value={swapAssets.receive.value || ""}
        coin={receivingAsset}
        sendedCoin={sendingAsset}
        disabled={!sendingAsset || !receivingAsset || sendingAsset.amount <= 0}
      />

      <Section>
        <Delimiter />
        <Row className="justify-between swap-info-row">
          <div>{t("receive-value-title")}</div>
          <div>
            {sendingAsset &&
              receivingAsset &&
              (
                (swapAssets.send.value ? Number(swapAssets.send.value) - Number(swapAssets.send.value) * 0.17 : 0) *
                sendingAsset.usdPrice
              ).toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              })}
          </div>
        </Row>
        <Delimiter />
        <Row className="justify-between swap-info-row">
          <div>{t("route")}</div>
          {sendingAsset && receivingAsset && (
            <div>
              {sendingAsset?.meta?.symbol} » {receivingAsset?.meta?.symbol}
            </div>
          )}
        </Row>
        <Delimiter />
      </Section>
      {showAssetsList && (
        <AssetsList
          onClose={closeAssetsList}
          onJetonSelect={setJeton}
          assets={combinedAssets}
          excludeAssets={{ send: sendingAsset, receive: receivingAsset }}
        />
      )}
    </Page>
  );
};

export default Swap;
