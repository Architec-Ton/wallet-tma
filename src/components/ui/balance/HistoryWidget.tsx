import { ReactNode } from 'react';
import Section from '../../containers/Section';
import ListBlock from '../listBlock';
import { iconTrxRecv, iconTrxSend } from '../../../assets/icons/jettons';
import useLanguage from '../../../hooks/useLanguage';

import ListTileItem from '../listBlock/ListTileItem';
import { TransactionHistoryItemDto } from '../../../types/history';
import { shortenString } from './Address';
import ListBaseItem from '../listBlock/ListBaseItem';

type Props = {
  children?: ReactNode;
  items: TransactionHistoryItemDto[];
};

function HistoryWidget({ children, items = [] }: Props) {
  //   const ton = useTon();
  const t = useLanguage('history');
  // const navigate = useNavigate();

  return (
    <>
      {items && items.length > 0 && (
        <Section title={t('title')} className="add-crypto__container">
          <ListBlock>
            {items.map((h, index) => {
              return (
                <ListTileItem
                  key={index}
                  icon={h.type == 'in' ? iconTrxRecv : iconTrxSend}
                  title={t(h.type)}
                  description={shortenString(h.to)}
                  // onClick={assetClickHandler(asset)}
                >
                  <div className="list-block__right">
                    <div
                      className={`list-block__title ${
                        h.type == 'in' ? 'change-up' : ''
                      } `}>{`${h.value} ${h.symbol}`}</div>
                    <div className="list-block__description">
                      {new Date(h.utime * 1000).toLocaleString()}
                    </div>
                  </div>
                </ListTileItem>
              );
            })}
            {children && (
              <ListBaseItem className="center">{children}</ListBaseItem>
            )}
          </ListBlock>
        </Section>
      )}
    </>
  );
}

export default HistoryWidget;
