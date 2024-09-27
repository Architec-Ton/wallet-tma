import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Address, toNano } from "@ton/core";
import { selectAuthIsReady } from "features/auth/authSelector";
import { AssetKind, useLazyGetStonFiAssetQuery } from "features/stonfi/stonFiApi";
import { useApiWalletAssetsMutation } from "features/wallet/walletApi";
import type { CoinDto } from "types/assest";

import { iconPageSend } from "assets/icons/pages/send";

import { useAppSelector } from "hooks/useAppDispatch";
import useContracts from "hooks/useContracts";
import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import useRouter from "hooks/useRouter";
import { useTmaMainButton } from "hooks/useTma";
import { useTon } from "hooks/useTon";

import Page from "components/containers/Page";
import Row from "components/containers/Row";
import AddressInput from "components/inputs/AddressInput";
import Delimiter from "components/typography/Delimiter";
import TransferAsset from "components/ui/assets/TransferAssets";
import { shortenString } from "components/ui/balance/Address";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import AssetsList from "components/ui/send/assets";

import { TON_JETTON } from "../../constants";

interface ItemInfo {
  title: string;
  value?: string;
}

const SendPage = () => {
  const t = useLanguage("send");
  //   const navigate = useNavigate();
  const [walletApiAssets] = useApiWalletAssetsMutation();
  const [getStonFiAsset] = useLazyGetStonFiAssetQuery();
  const page = usePage();
  const navigate = useRouter();
  const [assets, setAssets] = useState<CoinDto[]>([]);
  const [asset, setAsset] = useState<CoinDto | undefined>(undefined);
  const [step, setStep] = useState<number>(0);
  const isReady = useAppSelector(selectAuthIsReady);
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [error, setError] = useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const btn = useTmaMainButton();
  const ton = useTon();
  const contracts = useContracts();
  const [confirmInfo, setConfirmInfo] = useState<ItemInfo[]>([]);
  const [assetPrice, setAssetPrice] = useState<string>();
  const { state } = useLocation(); // state is any or unknown

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    try {
      Address.parse(event.target.value);
      setError(false);
      setIsButtonEnabled(event.target.value !== "");
    } catch (err) {
      setError(true);
      setIsButtonEnabled(false);
    }
  };

  const handleAmountInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(event.target.value);

    if (step === 2 && !Number.isNaN(amount) && amount > 0 && asset && amount <= asset?.amount) {
      btn.init(
        t("continue", "button"),
        () => {
          setStep(3);
          btn.init(
            `${t("confirm", "button")} (${amount} ${asset.meta?.symbol})`,
            async () => {
              // Transfer

              btn.setVisible(false);
              if (asset.type === "ton") {
                const tx = await ton.sender.send({
                  value: toNano(amount),
                  to: Address.parse(address),
                  // bounce: false,
                  // sendMode:
                  //   SendMode.PAY_GAS_SEPARATELY | SendMode.IGNORE_ERRORS,
                });
                console.log({ tx });
              } else if (asset.type === "jetton") {
                if (
                  ton.wallet.address &&
                  asset.meta?.address &&
                  asset.meta?.decimals !== undefined &&
                  asset.meta?.decimals !== null
                ) {
                  const walletAddress = await contracts.jetton.getWallet(
                    Address.parse(asset.meta?.address),
                    ton.wallet.address,
                  );

                  const jettonAmount = BigInt(amount * 10 ** asset.meta.decimals);

                  if (walletAddress) {
                    const tx = await contracts.jetton.transfer(walletAddress, Address.parse(address), jettonAmount);
                    console.log("Jetton TX:", tx);
                  }
                }
              }
              setStep(4);
            },
            isButtonEnabled,
          );
          const itemsInfo: ItemInfo[] = [
            {
              title: t("sender"),
              value: shortenString(ton.wallet.address?.toString({ urlSafe: true }) || "hidden"),
            },
            {
              title: t("currency"),
              value: asset.meta?.symbol,
            },
            {
              title: t("amount"),
              value: amount?.toString(),
            },
            {
              title: t("commission"),
              value: `~ 0.002344 TON`,
            },
          ];
          setConfirmInfo(itemsInfo);
        },
        true,
      );
    } else if (step === 2) {
      btn.setVisible(false);
    }

    setAmount(event.target.value);
  };

  const handlerClick = (asset: CoinDto) => {
    if (address) {
      try {
        Address.parse(address);
        setIsButtonEnabled(true);
      } catch (e) {
        console.error(e);
      }
    }

    setStep(1);
    setAsset(asset);
  };

  const handleInfo = async () => {
    try {
      page.setLoading(true);
      const result = await walletApiAssets(null).unwrap();

      setAssets(result);
    } catch (err) {
      console.error("Failed to get info: ", err);
    } finally {
      page.setLoading(false, false);
    }
  };

  useEffect(() => {
    page.setTitle(t("choose-asset"));

    if (state) {
      setAddress(state);
    }

    if (isReady && !assets.length) handleInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, assets]);

  useEffect(() => {
    if (step === 1) {
      btn.init(
        t("continue", "button"),
        () => {
          btn.setVisible(false);
          setStep(2);
        },
        isButtonEnabled,
      );
    }
    if (step === 2) {
      if (asset) {
        const assetAddress = asset.type === AssetKind.Ton ? TON_JETTON : asset.meta?.address;

        getStonFiAsset(assetAddress).then(({ data }) => {
          const price = data?.asset.dex_price_usd || data?.asset.third_party_usd_price;

          setAssetPrice(price);
        });
      }
    }
    if (step === 4) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isButtonEnabled, step, asset]);

  const setMaxAmount = () => {
    setAmount(`${asset?.amount}`);
  };

  return (
    <Page>
      {step === 0 && <AssetsList assets={assets} title={t("title")} onClick={handlerClick} />}
      {step === 1 && (
        <>
          <AddressInput onChange={handleInputChange} value={address} className={`${error ? "input-error" : ""}`} />
          <Delimiter />
        </>
      )}
      {step === 2 && (
        <>
          <Row>
            <img src={iconPageSend} alt="Send Page" />
            <h2> Send to {shortenString(address)}</h2>
          </Row>
          <Delimiter />
          <TransferAsset
            asset={asset}
            value={amount}
            onChange={handleAmountInputChange}
            setMaxAmount={setMaxAmount}
            assetPrice={assetPrice}
          />
        </>
      )}
      {step === 3 && (
        <>
          <Row>
            <img src={iconPageSend} alt="Send Page" />
            <h2> Send to {shortenString(address)}</h2>
          </Row>
          <Delimiter />
          <ListBlock>
            {confirmInfo.map((item, index) => (
              <ListBaseItem key={index}>
                <Row className="space-between w-100">
                  <div>{item.title}</div>
                  <div>{item.value}</div>
                </Row>
              </ListBaseItem>
            ))}
          </ListBlock>
        </>
      )}
    </Page>
  );
};

export default SendPage;
