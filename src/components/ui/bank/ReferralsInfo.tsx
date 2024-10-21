import React from "react";
import { Link } from "react-router-dom";

import { iconReferralsButton } from "assets/icons/buttons";

import useLanguage from "hooks/useLanguage";

import Column from "../../containers/Column";
import MiniBlock from "../../typography/MiniBlock";
import Title from "../../typography/Title";
import ListBlock from "../listBlock";
import ListBaseItem from "../listBlock/ListBaseItem";
import "./ReferralsInfo.style.css";

const ReferralsInfo = ({ referrals }: {
  referrals?: number
}) => {
  const t = useLanguage("bank");

  return (
    <ListBlock>
      <ListBaseItem className="referals-block grow">
        <Column className="referals-info grow">
          <Title title={t("Referrals")} hintMessage={t("Referrals-hint")} />
          <MiniBlock icon={iconReferralsButton} text={Number(referrals)} className="grow" />
        </Column>
      </ListBaseItem>
      <ListBaseItem className="center">
        <Link to="/bank/referal">{t("see-all")}</Link>
      </ListBaseItem>
    </ListBlock>
  );
};

export default ReferralsInfo;
