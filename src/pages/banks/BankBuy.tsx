import { useEffect, useState } from "react";
import Page from "../../components/containers/Page";
import useLanguage from "../../hooks/useLanguage";
import { usePage } from "../../hooks/usePage";
import Delimiter from "../../components/typography/Delimiter";

import { useAppSelector } from "../../hooks/useAppDispatch";
import { selectAuthIsReady } from "../../features/auth/authSelector";
import { useApiGetBankBuyMutation } from "../../features/bank/bankApi";
import useContracts from "../../hooks/useContracts";
import { toNano, Address } from "@ton/core";
import SendAssetInput from "../../components/ui/assets/SendAssets";
import { CoinDto } from "../../types/assest";
import RecvAssetInput from "../../components/ui/assets/RecvAssets";
import { iconInfoButton, iconReverseButton } from "../../assets/icons/buttons";
import { useTmaMainButton } from "../../hooks/useTma";
import useRouter from "../../hooks/useRouter";
import FormatMessage from "../../components/typography/FormatMessage";
// import Column from '../../components/containers/Column';
import Row from "../../components/containers/Row";

import "./BankBuy.styles.css";
import { selectReferral } from "../../features/tma/tmaSelector";

function BankBuy() {
  const bnkPrice = 1.5;
  const page = usePage();
  const isReady = useAppSelector(selectAuthIsReady);
  const t = useLanguage("bank-buy");
  const navigate = useRouter();
  const [sendAsset, setSendAsset] = useState<CoinDto | undefined>(undefined);
  const [recvAsset, setRecvAsset] = useState<CoinDto | undefined>(undefined);
  const [bankBuyApi] = useApiGetBankBuyMutation();
  const btn = useTmaMainButton();

  const [sendAmount, setSendAmount] = useState<string>("");
  const [recvAmount, setRecvAmount] = useState<string>("");
  const [recvMaxAmount, setRecvMaxAmount] = useState<number>(0);

  const refAddress = useAppSelector(selectReferral);

  useEffect(() => {
    const btnVisible =
      !!sendAsset &&
      Number(recvAmount) > 0 &&
      recvMaxAmount >= Number(recvAmount) &&
      Number(sendAmount) <= sendAsset?.amount;
    btn.setVisible(btnVisible);
  }, [recvAmount, recvMaxAmount, sendAmount, btn]);

  const contracts = useContracts();

  const handleInfo = async () => {
    try {
      const result = await bankBuyApi(null).unwrap();
      setSendAsset(result.ton);
      setRecvAsset(result.bnk);
      setRecvMaxAmount(Math.trunc(result.ton.amount / bnkPrice));
    } catch (err) {
      console.error("Failed to get info: ", err);
    } finally {
      page.setLoading(false, false);
      // btn.init(t('buy', 'button'), () => handleBuyBank, true);
    }
  };

  useEffect(() => {
    if (isReady) handleInfo();
  }, [isReady]);

  useEffect(() => {
    page.setLoading(false);
  }, []);

  useEffect(() => {
    const bnkAmount = Math.trunc(Number(sendAmount) / bnkPrice);
    const btnVisible =
      !!sendAsset &&
      Number(recvAmount) > 0 &&
      recvMaxAmount >= Number(recvAmount) &&
      Number(sendAmount) <= sendAsset?.amount;
    if (isReady) {
      console.log("update number ton: ", Number(bnkAmount * bnkPrice));
      btn.init(
        `${t("buy", "button")} (${Number(bnkAmount * bnkPrice).toLocaleString(
          undefined,
          {
            maximumFractionDigits: 1,
          }
        )} TON)`,
        () => {
          console.log("number ton: ", Number(bnkAmount * bnkPrice));
          handleBuyBank(Number(bnkAmount * bnkPrice));
        },
        btnVisible
      );
    }
  }, [sendAmount, isReady, recvAmount, recvMaxAmount, isReady, sendAsset]);

  const handleSendOnBlur = () => {
    if (sendAmount) {
      const amount = Number(sendAmount);
      const bnkAmount = Math.trunc(amount / bnkPrice);
      setSendAmount((bnkAmount * bnkPrice).toString());
    }
    //setSendAmount((bnkAmount * bnkPrice).toString());
  };

  const handleSendOnChange = (value: string) => {
    const tonAmount = Number(value);
    if (!isNaN(tonAmount)) {
      const bnkAmount = Math.trunc(tonAmount / bnkPrice);
      if (bnkAmount <= recvMaxAmount)
        setRecvAmount(() => (bnkAmount ? bnkAmount.toString() : ""));
      //setSendAmount((bnkAmount * bnkPrice).toString());
      setSendAmount(value);
    }
  };

  const handleRecvOnChange = (value: string) => {
    const bnkAmount = Number(value);
    if (!isNaN(bnkAmount)) {
      const bnkTAmount = Math.trunc(bnkAmount);
      if (bnkAmount <= recvMaxAmount) {
        setSendAmount(() =>
          bnkAmount ? (bnkTAmount * bnkPrice).toString() : ""
        );
        setRecvAmount(() => (bnkAmount ? bnkTAmount.toString() : ""));
      }
    }
  };

  const handleBuyBank = async (amount: number) => {
    console.log(sendAmount);
    try {
      if (refAddress) {
        const tx = await contracts.bank.buyWithReferral(
          Address.parse(refAddress),
          toNano(amount)
        );
        console.log("transaction:", tx);
      } else {
        const tx = await contracts.bank.buy(toNano(amount));
        console.log("transaction:", tx);
      }
      navigate("/bank");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Page title={t("title")}>
      <Delimiter />
      <SendAssetInput
        asset={sendAsset}
        value={sendAmount}
        onChange={handleSendOnChange}
        onBlur={handleSendOnBlur}
      />
      {/* {sendAsset && <AssetInput asset={sendAsset} value="00" />} */}
      <Delimiter>
        <img src={iconReverseButton} alt="" />
      </Delimiter>
      <RecvAssetInput
        maxValue={recvMaxAmount}
        asset={recvAsset}
        value={recvAmount}
        subTitle={`${bnkPrice} TON = 1 BNK`}
        onChange={handleRecvOnChange}
      />
      <Delimiter />
      <Row className="mint-info">
        <div>
          <FormatMessage components={{ span: <span /> }}>
            {t("info")}
          </FormatMessage>
        </div>
        <img src={iconInfoButton} alt="" />
      </Row>
      <Delimiter />
      {/* <button className="primary-button" onClick={() => handleBuyBank()}>
        Buy 1 BNK
      </button> */}
    </Page>
  );
}

export default BankBuy;
