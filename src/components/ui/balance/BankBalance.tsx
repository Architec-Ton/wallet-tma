import { ReactNode } from 'react';
import Column from '../../containers/Column';
import Row from '../../containers/Row';
import Block from '../../typography/Block';

import './Balance.styles.css';
import { WalletInfoData } from '../../../types/wallet';
import Address from './Address';
import Button from '../../buttons/Button';
import { iconBankButton } from '../../../assets/icons/buttons';
import useRouter from "../../../hooks/useRouter.ts";

type Props = {
  walletInfoData: WalletInfoData | null;
  children?: ReactNode;
};

function BankBalance({ children, walletInfoData }: Props) {
    const navigate = useRouter();
  return (
    <Block className="balance-block space-between">
      <Column className="w-100 start">
        <h1 className="title">
          <span>Bank</span> Architec.TON
        </h1>
        <Row className="space-between">
          <div className="balance-block-value">
            {walletInfoData &&
              `${walletInfoData.wallets[
                walletInfoData.currentWallet
              ].usdPrice.toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })} $ARCH`}
          </div>
          {/* <h1>
            <span>Wallet</span> Architec.TON
          </h1>
          <div>...</div> */}
        </Row>
        <Row
          style={{
            margin: '1rem 0',
          }}>
          <Button icon={iconBankButton} onClick={() => navigate('/mint-bank')}>Buy</Button>
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

export default BankBalance;
