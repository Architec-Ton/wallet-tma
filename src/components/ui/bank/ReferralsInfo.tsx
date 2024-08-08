import React from "react";
import { Link } from "react-router-dom";

import { iconReferralsButton } from "assets/icons/buttons";

import useLanguage from "hooks/useLanguage";

import Column from "../../containers/Column";
import MiniBlock from "../../typography/MiniBlock";
import Title from "../../typography/Title";
import ListBlock from "../listBlock";
import ListBaseItem from "../listBlock/ListBaseItem";
// import { useApiGetBankReferralsQuery } from "features/bank/bankApi";
import "./ReferralsInfo.style.css";

const ReferralsInfo = () => {
  const t = useLanguage("bank");
  // const { data, isLoading } = useApiGetBankReferralsQuery(null)

  // if (isLoading) {
  //   return null
  // }

  return (
    <ListBlock>
      <ListBaseItem className="referals-block grow">
        <Column className="referals-info grow">
          <Title title={t("Referrals")} hintMessage={t("Referrals-hint")} />
          <MiniBlock icon={iconReferralsButton} text={0} className="grow" />
        </Column>
      </ListBaseItem>
      <ListBaseItem className="center">
        <Link to="/bank/referal">{t("see-all")}</Link>
      </ListBaseItem>
    </ListBlock>
  );
};

export default ReferralsInfo;
