import { useEffect, useMemo, useState } from "react"
import BankStakingHistorySection, { StakeHistoryType } from "./BankStakingHistorySection"
import Section from "../../containers/Section"
import Page from "../../containers/Page"
import { iconSortButton } from "../../../assets/icons/buttons"
import { usePage } from "../../../hooks/usePage"
import { formatDate } from "date-fns"
import { useApiWalletAssetsMutation } from "../../../features/wallet/walletApi"
import { CoinDto } from "../../../types/assest"
import { useClosure } from "../../../hooks/useClosure"
import ModalPinCode from "../modals/modalPinCode"
import { initialAssets } from "../../../mocks/mockAssets"
import TransactionModal from "../modals/transactionModal"
import Row from "../../containers/Row"
import useLanguage from "../../../hooks/useLanguage"
import TransactionCompleteModal from "../modals/transactionCompleteModal"
import bankIcon from '../../../assets/images/bank.png'
import { Link } from "react-router-dom"

const historyMockData = [
  {
    date: "2024-06-16",
    rewards: 1,
    deposit: 100,
    claimAvailable: true
  },
  {
    date: "2024-06-18",
    rewards: 10,
    deposit: 1000,
    claimAvailable: true
  },
  {
    date: "2024-06-18",
    rewards: 1,
    deposit: 100,
    claimAvailable: false
  },
  {
    date: "2024-02-20",
    rewards: 0.1,
    deposit: 10,
    claimAvailable: true
  }
]

const BankStakingHistory = () => {
  const t = useLanguage("stake")
  const [walletApiAssets] = useApiWalletAssetsMutation();
  const [historyData, setHistoryData] = useState<StakeHistoryType[]>()
  const [claimingData, setClaimingData] = useState<StakeHistoryType>()
  const [showPinCode, setShowPinCode] = useState<boolean>(false)
  const [direction, setDirection] = useState<"desc" | "asc">("desc")
  const [bnkAsset, setBnkAsset] = useState<CoinDto | undefined>()
  const [arcAsset, setArcAsset] = useState<CoinDto | undefined>()
  const [showTransaction, setShowTransaction] = useState<boolean>(false);
  const [showTransactionComplete, setShowTransactionComplete] =
    useState<boolean>(false);
  const [isTransactionInProgress, setIsTransactionInProgress] =
    useState<boolean>(false);
  const page = usePage()

  useEffect(() => {
    // getHistoryData
    setHistoryData(historyMockData)
    page.setLoading(false)
  }, [])

  const sortHandler = () => {
    setDirection(direction => direction === "desc" ? "asc" : "desc")
  }

  const sortedData = useMemo(() => {
    if (historyData) {
      console.log(direction)
      const data = historyData.sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        if (aDate > bDate) {
          return direction === "desc" ? -1 : 1
        } else if (aDate < bDate) {
          return direction === "desc" ? 1 : -1
        }
        return 0
      })
      const groupedData = data.reduce((acc, history: StakeHistoryType) => {
        const group = acc.get(history.date) || []        
        group.push(history)
        acc.set(history.date, group)
        return acc
      }, new Map() as Map<string, StakeHistoryType[]>)
      
      return Object.fromEntries(groupedData)
    }
    return {}
  }, [historyData, direction])

  const onClaim = useClosure(async (stakedData: StakeHistoryType) => {
    setClaimingData(stakedData)
    setShowPinCode(true)
  })

  const onSuccess = async () => {
    const assets: CoinDto[] = (await walletApiAssets(null).unwrap()) || initialAssets
    const bnk = assets.find(asset => asset.meta?.symbol === "BNK")
    const arc = assets.find(asset => asset.meta?.symbol === "ARC")
    setBnkAsset(bnk)
    setArcAsset(arc)
    setShowPinCode(false)
    setShowTransaction(true)
  }

  const claimTransaction = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 10000);
    });
  };

  const transactionSuccessHandler = async () => {
    setIsTransactionInProgress(true);
    try {
      await claimTransaction();
      setIsTransactionInProgress(false);
      setShowTransaction(false);
      setShowTransactionComplete(true);
    } catch (e) {
      console.error(e);
      setIsTransactionInProgress(false);
      setShowTransaction(false);
    }
  };
  
  return (
    <Page>
      <Section title="History Stake" readMore={<img src={iconSortButton} onClick={sortHandler} alt="" />}>
        {sortedData && Object.keys(sortedData).map(key => {
          const dataList = sortedData[key] as StakeHistoryType[]
          return (
            <Section key={key} title={formatDate(key, "dd MMM")}>
              {dataList.map(data => <BankStakingHistorySection key={`${Object.values(data).join("_")}`} stakeHistory={data} onClaim={onClaim} />)}
            </Section>
          )
        })}
      </Section>
      {showPinCode && (
        <ModalPinCode onSuccess={onSuccess} mode="registration" />
      )}
      {showTransaction && (
        <TransactionModal
          commission={0.17}
          returnValue={0.125}
          address={arcAsset?.meta?.address as string}
          onClose={() => setShowTransaction(false)}
          onSuccess={transactionSuccessHandler}
          inProgress={isTransactionInProgress}
          tonUsdPrice={6.7}
        >
          <Row className="transaction-assets">
            <img src={bnkAsset?.meta?.image} alt="" />
            <img src={arcAsset?.meta?.image} alt="" />
          </Row>
          <div className="">
            +{claimingData?.deposit} {bnkAsset?.meta?.symbol}
          </div>
          <div className="">
            +{claimingData?.rewards} {arcAsset?.meta?.symbol}
          </div>
          <div className="secondary-data">
            {Number(claimingData?.rewards) * Number(arcAsset?.usdPrice)} $
          </div>
          <div className="secondary-data">
            {t('page-title')} {formatDate(new Date(), "d MM, hh:mm")}
          </div>
        </TransactionModal>
      )}
      {showTransactionComplete && (
        <TransactionCompleteModal
          onClose={() => setShowTransactionComplete(false)}
          thumb={bankIcon}
          title={`Your staked ${0} BANK`}
        >
          <div>
            Your tokens have been successfully sent to staking! Thanks for choosing and believing us 🩵 
          </div>
          <Link to="/bank" className="primary-button rounded-button">{t("Bank")}</Link>
        </TransactionCompleteModal>
      )}
    </Page>
  )
}

export default BankStakingHistory