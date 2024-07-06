import { ReactNode } from 'react';
import Column from '../../containers/Column';
import Row from '../../containers/Row';
import Block from '../../typography/Block';

import './Balance.styles.css';
import { WalletInfoData } from '../../../types/wallet';
import Address from './Address';
import Button from '../../buttons/Button';
import { iconBankButton } from '../../../assets/icons/buttons';
import useRouter from '../../../hooks/useRouter';
import useLanguage from '../../../hooks/useLanguage';

type Props = {
  walletInfoData: WalletInfoData | null;
  children?: ReactNode;
};

function BankBalance({ children, walletInfoData }: Props) {
  const navigate = useRouter();
  const t = useLanguage('bank-balance');
  return (
    <Block className="balance-block space-between">
      <Column className="w-100 start">
        <h1 className="title start">
          <span>Bank</span> Architec.TON
        </h1>
        <Row className="space-between">
          <div className="balance-block-value">
            {walletInfoData && `0.00000 ARC`}{' '}
            <span className="text-small">(0 banks)</span>
          </div>
          {/* <h1>
            <span>Wallet</span> Architec.TON
          </h1>
          <div>...</div> */}
        </Row>
        <Row
          style={{
            margin: 'var(--spacing-16) 0',
          }}>
          <Button icon={iconBankButton} onClick={() => navigate('/bank/buy')}>
            {t('Buy', 'button')}
          </Button>
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
