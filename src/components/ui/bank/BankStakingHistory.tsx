import { useEffect, useMemo, useState } from "react";
import BankStakingHistorySection, {
  StakeHistoryType,
} from "./BankStakingHistorySection";
import Section from "../../containers/Section";
import Page from "../../containers/Page";
import { iconSortButton } from "../../../assets/icons/buttons";
import { usePage } from "../../../hooks/usePage";
import { formatDate } from "date-fns";
import { useApiWalletAssetsMutation } from "../../../features/wallet/walletApi";
// import { CoinDto } from "../../../types/assest";
// import Row from "../../containers/Row";
// import useLanguage from "../../../hooks/useLanguage";
// import bankIcon from "../../../assets/images/bank.png";
// import { useNavigate } from "react-router-dom";
// import PartialContent from "../modals/PartialContent";
import useContracts from "../../../hooks/useContracts";
import { useTon } from "../../../hooks/useTon";
// import { fromNano } from "@ton/core";

const historyMockData = [
  {
    date: "2024-06-16",
    rewards: 1,
    deposit: 100,
    claimAvailable: false,
  },
  {
    date: "2024-06-18",
    rewards: 10,
    deposit: 1000,
    claimAvailable: true,
  },
  {
    date: "2024-06-18",
    rewards: 1,
    deposit: 100,
    claimAvailable: false,
  },
  {
    date: "2024-02-20",
    rewards: 0.1,
    deposit: 10,
    claimAvailable: false,
  },
];

const BankStakingHistory = () => {
  // const t = useLanguage("bank-stake-history");
  // const navigate = useNavigate();
  const [walletApiAssets] = useApiWalletAssetsMutation();
  const page = usePage();
  const contracts = useContracts();
  const ton = useTon();

  const [historyData, setHistoryData] = useState<StakeHistoryType[]>();
  const [direction, setDirection] = useState<"desc" | "asc">("desc");
  // const [bnkAsset, setBnkAsset] = useState<CoinDto | undefined>();
  // const [arcAsset, setArcAsset] = useState<CoinDto | undefined>();
  // const [arc, setArc] = useState<string>();

  useEffect(() => {
    // getHistoryData
    setHistoryData(historyMockData);
    walletApiAssets(null)
      .unwrap()
      // .then((assets) => {
      //   // const bnk = assets.find((asset) => asset.meta?.symbol === "BNK");
      //   // const arc = assets.find((asset) => asset.meta?.symbol === "ARC");
      //   // setBnkAsset(bnk);
      //   // setArcAsset(arc);
      // })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        page.setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   if (arcAsset) {
  //     transaction.init({
  //       commission: 0.17,
  //       returnValue: 0.125,
  //       address: arcAsset.meta?.address as string,
  //       completeIcon: bankIcon,
  //       completeTitle: t("complete-title")
  //     })
  //   }
  // }, [arcAsset])

  const sortHandler = () => {
    setDirection((direction) => (direction === "desc" ? "asc" : "desc"));
  };

  const sortedData = useMemo(() => {
    if (historyData) {
      console.log(direction);
      const data = historyData.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        if (aDate > bDate) {
          return direction === "desc" ? -1 : 1;
        } else if (aDate < bDate) {
          return direction === "desc" ? 1 : -1;
        }
        return 0;
      });
      const groupedData = data.reduce((acc, history: StakeHistoryType) => {
        const group = acc.get(history.date) || [];
        group.push(history);
        acc.set(history.date, group);
        return acc;
      }, new Map() as Map<string, StakeHistoryType[]>);

      return Object.fromEntries(groupedData);
    }
    return {};
  }, [historyData, direction]);

  const handleStakeInfo = async () => {
    if (ton.wallet.address) {
      const ownerAddress = ton.wallet.address;
      //Get BNK Wallet address
      const stakeAddress = await contracts.bank.getStakeAddress(ownerAddress);
      console.log("BNK Stake Wallet", stakeAddress?.toString());
      if (stakeAddress) {
        const stakeInfo = await contracts.bank.getStakeInfo(
          stakeAddress,
          ownerAddress
        );
        // if (stakeInfo) setArc(fromNano(stakeInfo.calculatedAmount));
        console.log("getStakeInfo:", stakeInfo);
      }
    }
  };

  const handleClaim = async () => {
    if (ton.wallet.address) {
      //Get BNK Wallet address
      const tx = await contracts.bank.claim();
      console.log("Unstake", tx);
    }
  };

  const onClaim = async () => {
    try {
      await handleStakeInfo();
      await handleClaim();
    } catch (e) {
      console.error(e);
    }
  };

  // const onComplete = () => {
  //   navigate("/bank");
  // };

  return (
    <Page>
      <Section
        title="History Stake"
        readMore={<img src={iconSortButton} onClick={sortHandler} alt="" />}
      >
        {sortedData &&
          Object.keys(sortedData).map((key) => {
            const dataList = sortedData[key] as StakeHistoryType[];
            return (
              <Section key={key} title={formatDate(key, "dd MMM")}>
                {dataList.map((data) => (
                  <BankStakingHistorySection
                    key={`${Object.values(data).join("_")}`}
                    stakeHistory={data}
                    onClaim={onClaim}
                  />
                ))}
              </Section>
            );
          })}
      </Section>
      {/* {transaction.isOpen && (
        <PartialContent wait={[transaction.isOpen]} init={transaction.setPartialContent}>
          <Row className="transaction-assets">
            <img src={bnkAsset?.meta?.image} alt="" />
            <img src={arcAsset?.meta?.image} alt="" />
          </Row>
          <div className="">
            +{arc} {arcAsset?.meta?.symbol}
          </div>
          <div className="secondary-data">
            {Number(arc) * Number(arcAsset?.usdPrice)} $
          </div>
          <div className="secondary-data">
            {t('claim')} {formatDate(new Date(), "d MMMM, hh:mm")}
          </div>
        </PartialContent>
      )}
      
      {transaction.isComplete && (
        <PartialContent wait={[transaction.isComplete]} init={transaction.setPartialContent}>
          <div>
            {t("complete-description")} 
          </div>
          <button onClick={onComplete} className="primary-button rounded-button">{t("bank-button")}</button>
        </PartialContent>
      )} */}
    </Page>
  );
};

export default BankStakingHistory;
