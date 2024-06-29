import { ReactNode } from "react";
import { useTon } from "../../../hooks/useTon";
import Column from "../../containers/Column";
import Row from "../../containers/Row";
import Block from "../../typography/Block";

import "./Balance.styles.css";
import { WalletInfoData } from "../../../types/wallet";
import { Address as TonAddress } from "@ton/core";
import Address from "./Address";

type Props = {
  walletInfoData: WalletInfoData | null;
  children?: ReactNode;
};

function Balance({ children, walletInfoData }: Props) {
  const ton = useTon();

  return (
    <Block className="balance-block space-between">
      <Column className="w-100">
        <Row className="space-between">
          <div className="balance-block-value">
            {walletInfoData &&
              `$ ${walletInfoData.wallets[
                walletInfoData.currentWallet
              ].usdPrice.toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}`}
          </div>
          <div> Control </div>
          {/* <h1>
            <span>Wallet</span> Architec.TON
          </h1>
          <div>...</div> */}
        </Row>

        {children}
      </Column>
      <Address
        address={
          walletInfoData
            ? walletInfoData.wallets[
                walletInfoData.currentWallet
              ].address.toString()
            : undefined
        }
      />
    </Block>
  );
}

export default Balance;
