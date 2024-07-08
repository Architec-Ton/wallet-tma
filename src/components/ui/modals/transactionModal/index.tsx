import { iconGlobalButton } from '../../../../assets/icons/buttons';
// import { iconTon, iconUsdt } from "../../../../assets/icons/jettons"
import useLanguage from '../../../../hooks/useLanguage';
import { CoinDto } from '../../../../types/assest';
import Column from '../../../containers/Column';
import Row from '../../../containers/Row';
import InlineLoader from '../../inlineLoader';
import ListBlock from '../../listBlock';
import ListBaseItem from '../../listBlock/ListBaseItem';
import Modal from '../../modal';

import './index.css';

type TransactionModalPropsType = {
  onClose: () => void;
  onSuccess?: () => void;
  from?: CoinDto | undefined;
  to?: CoinDto | undefined;
  sendedValue?: string;
  receivedValue?: string;
  commission?: number;
  returnValue?: number;
  address?: string;
  transactionType?: string;
  transactionData?: Date;
  inProgress?: boolean;
  tonUsdPrice?: number;
  children?: React.ReactNode;
};

const TransactionModal = ({
  onClose,
  onSuccess,
  commission,
  returnValue,
  address,
  inProgress,
  tonUsdPrice,
  children
}: TransactionModalPropsType) => {
  const t = useLanguage('transaction');

  return (
    <Modal onClose={onClose}>
      <Column className="transaction-data">
        {children}
        {inProgress && (
          <Row className="process">
            <InlineLoader />
            <div>{t('loading')}</div>
          </Row>
        )}
      </Column>
      <ListBlock className="transaction-info__list">
        <ListBaseItem>
          <Column className="receiver-address">
            <div>{t('receiver-address')}</div>
            <span>{address}</span>
          </Column>
        </ListBaseItem>
        <ListBaseItem>
          <div>{t('commission')}</div>
          <Column className="transaction-info">
            <div>{commission} TON</div>
            <div className="secondary-info">
              $ {commission && commission * Number(tonUsdPrice)}
            </div>
          </Column>
        </ListBaseItem>
        <ListBaseItem>
          <div>{t('return')}</div>
          <Column className="transaction-info">
            <div>{returnValue} TON</div>
            <div className="secondary-info">
              $ {returnValue && returnValue * Number(tonUsdPrice)}
            </div>
          </Column>
        </ListBaseItem>
        <ListBaseItem>
          <div>{t('comment')}</div>
          <div>{t('finish')}</div>
        </ListBaseItem>
      </ListBlock>
      <button
        className="rounded-button control-button transaction-button"
        onClick={onSuccess}>
        <Row>
          <img src={iconGlobalButton} alt="" />
          <span>{t('page-title')}</span>
        </Row>
      </button>
    </Modal>
  );
};

export default TransactionModal;
