import { useEffect, useState } from "react";
import Page from "../../components/containers/Page";
import { usePage } from "../../hooks/usePage";
import useLanguage from "../../hooks/useLanguage";
import BlockWithTitle from "../../components/typography/BlockWithTitle";
import FormatMessage from "../../components/typography/FormatMessage";

import "./BankReferral.styles.css";
import Row from "../../components/containers/Row";
import {
  iconBankButton,
  iconButtonCopyLight,
  iconButtonProfileUsers,
} from "../../assets/icons/buttons";
import MiniBlock from "../../components/typography/MiniBlock";
import { useApiGetBankReferralsQuery } from "../../features/bank/bankApi";
import { useDispatch } from "react-redux";
import { showAlert } from "../../features/alert/alertSlice.ts";
import { useTon } from "../../hooks/useTon/index.ts";
import { APP_URL } from "../../constants.ts";

const BankReferral = () => {
  const t = useLanguage("bank-referral");
  const page = usePage();
  const ton = useTon();
  const { data, isLoading } = useApiGetBankReferralsQuery(null);
  const dispatch = useDispatch();

  const [referralLink, setReferralLink] = useState<string>(APP_URL);

  useEffect(() => {
    page.setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (ton.wallet.address) {
      // TODO: set true referral link
      setReferralLink(
        `${APP_URL}?startapp=${ton.wallet.address.toString({
          urlSafe: true,
          bounceable: true,
        })}`
      );
    }
  }, [ton]);

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          dispatch(showAlert({ message: "copy", duration: 1500 }));
        })
        .catch((err) => console.error("Failed to copy text: ", err));
    }
  };

  return (
    <Page title={t("page-title")}>
      <BlockWithTitle
        title={t("earning-program")}
        hintMessage={t("earning-program-hint")}
        className="referral-block"
      >
        <div className="referral-earn-more">
          <FormatMessage components={{ span: <span /> }}>
            {t("earn-more")}
          </FormatMessage>
        </div>
        <div className="referal-earn-desc">{t("earn-description")}</div>
        <Row className="referral-link-row w-full">
          <div className="referral-link grow">{referralLink}</div>
          <button
            className="primary-button rounded-button copy-button"
            onClick={copyToClipboard}
          >
            <img src={iconButtonCopyLight} alt="" />
          </button>
        </Row>
      </BlockWithTitle>
      <Row className="referral-data w-full">
        <BlockWithTitle
          title={t("reward-title")}
          hintMessage={t("reward-hint")}
          className=""
        >
          <MiniBlock icon={iconBankButton} text={data?.reward || 0} />
        </BlockWithTitle>
        <BlockWithTitle
          title={t("referral-title")}
          hintMessage={t("referral-hint")}
        >
          <MiniBlock icon={iconButtonProfileUsers} text={data?.count || 0} />
          <div className="referral-count">
            <div className="font-medium">{t("bought-bank")}</div>
            <div className="">
              <FormatMessage components={{ span: <span /> }}>
                {t("count", undefined, { count: data?.boughtBanks || 0 })}
              </FormatMessage>
            </div>
          </div>
        </BlockWithTitle>
      </Row>
    </Page>
  );
};

export default BankReferral;
