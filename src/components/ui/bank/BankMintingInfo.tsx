import React, { useMemo } from "react";

import useLanguage from "hooks/useLanguage";

import Grid from "../../containers/Grid";
import BlockWithTitle from "../../typography/BlockWithTitle";
import { BankInfoDto } from "types/banks";

import "./BankMintingInfo.styles.css";


const BankMintingInfo = ({bankInfo}: {
  bankInfo: BankInfoDto | null
}) => {
  const t = useLanguage("bank");

  const progress = useMemo(() => {
    if (bankInfo) {
      return Math.round(100 - (100 * bankInfo.freeBanks) / bankInfo.totalBanks);
    }
  }, [bankInfo])

  return (
    <BlockWithTitle title={t("minting")} hintMessage={t("minting-hint")} className="minting-info__block">
      <Grid columns={3} gap={4} className="minting-info">
        <Grid rowSpan={2}>
          <div className="minting-percent">
            <div className="percent-progress grow" style={{ height: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        </Grid>
        <Grid colSpan={2} className="bankers">
          <div>{t("bankers")}</div>
          <div>{bankInfo?.bankers.toLocaleString()}</div>
        </Grid>
        <Grid colSpan={2} className="free-banks">
          <div>{t("free-banks")}</div>
          <span>{bankInfo?.freeBanks.toLocaleString()}</span>
        </Grid>
      </Grid>
    </BlockWithTitle>
  );
};

export default BankMintingInfo;
