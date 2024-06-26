import { ReactNode } from "react";
import { useTon } from "../../../hooks/useTon";
import Column from "../../containers/Column";
import Row from "../../containers/Row";
import Block from "../../typography/Block";
import Address from "./Address";
import "./Balance.styles.css";

type Props = {
  children?: ReactNode;
};

function Balance({ children }: Props) {
  const ton = useTon();

  return (
    <Block className="balance-block space-between">
      <Column className="w-100">
        <Row className="space-between">
          <div className="balance-block-value">$59 232,68</div>
          <div> Control </div>
          {/* <h1>
            <span>Wallet</span> Architec.TON
          </h1>
          <div>...</div> */}
        </Row>

        {children}
      </Column>
      <Address address={ton.wallet.address?.toString({ bounceable: false })} />
    </Block>
  );
}

export default Balance;
