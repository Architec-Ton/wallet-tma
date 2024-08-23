import type { ReactNode } from "react";
import React from "react";

import { iconBankButton } from "assets/icons/buttons";

import useLanguage from "hooks/useLanguage";
import useRouter from "hooks/useRouter";

import Button from "../../buttons/Button";
import Column from "../../containers/Column";
import Row from "../../containers/Row";
import Block from "../../typography/Block";
import Address from "./Address";
import "./Balance.styles.css";
import useIsIphone from "hooks/useIsIphone";

type Props = {
  address?: string;
  arcAmount: bigint;
  bnkAmount: bigint;
  children?: ReactNode;
};

function BankBalance({ children, arcAmount, bnkAmount, address }: Props) {
  const navigate = useRouter();
  const t = useLanguage("bank-balance");
  const isIphone = useIsIphone();
  return (
    <Block className="balance-block space-between">
      <Column className="w-100 start">
        <h1 className="title start">
          <span>Bank</span> Architec.TON
        </h1>
        <Row className="space-between">
          <div className="balance-block-value">
            {Number((arcAmount * 100n) / 1_000_00n) / 100_000_0} ARC
            {/* {Number(arcAmount) / (10 ^ 9)} ffff
            {walletInfoData &&
              `${((arcAmount * 10n) / 1000_000_000_0n).toString()} ARC`}{' '} */}
            <span className="text-small"> ({Number(bnkAmount)} banks)</span>
          </div>
          {/* <h1>
            <span>Wallet</span> Architec.TON
          </h1>
          <div>...</div> */}
        </Row>
        <Row
          style={{
            margin: "var(--spacing-16) 0",
          }}
        >
          {!isIphone && <Button icon={iconBankButton} onClick={() => navigate("/bank/buy")} className="buy-button">
            {t("Buy", "button")}
          </Button>
          }
        </Row>

        {children}
      </Column>
      <Address address={address} />
    </Block>
  );
}

export default BankBalance;
