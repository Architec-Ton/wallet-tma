import { ReactNode } from 'react';
import './Balance.styles.css';
import Block from '../../typography/Block';
import Row from '../../containers/Row';
import Address from './Address';
import Column from '../../containers/Column';

type Props = {
  children?: ReactNode;
};

function Balance({ children }: Props) {
  return (
    <Block className="balance-block space-between">
      <Column className="w-100">
        <Row className="space-between">
          <h1>
            <span>Wallet</span> Architec.TON
          </h1>
          <div>...</div>
        </Row>
        <div className="balance-block-value">$59 232,68</div>
        {children}
      </Column>
      <Address address="UQAN0l6iey...RZ9xwQPH72S" />
    </Block>
  );
}

export default Balance;
