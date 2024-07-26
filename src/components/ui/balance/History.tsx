import { useMemo } from 'react';
import Section from '../../containers/Section';
import ListBlock from '../listBlock';
import { iconTrxRecv, iconTrxSend } from '../../../assets/icons/jettons';
import useLanguage from '../../../hooks/useLanguage';

import ListTileItem from '../listBlock/ListTileItem';
import { TransactionHistoryItemDto } from '../../../types/history';
import { shortenString } from './Address';
import { formatDate } from 'date-fns';

import "./History.styles.css"

type Props = {
  items: TransactionHistoryItemDto[];
};

function History({ items = [] }: Props) {
  //   const ton = useTon();
  const t = useLanguage('history');
  // const navigate = useNavigate();

  const groupedItems = useMemo(() => {
    console.log("items", items)
    if (items) {
      const groupedData = items.reduce((acc, history: TransactionHistoryItemDto) => {
        const date = formatDate((new Date(history.utime * 1000)).toString(), "yyyy-MM-dd")
        const group = acc.get(date) || [];
        group.push(history);
        acc.set(date, group);
        return acc;
      }, new Map() as Map<string, TransactionHistoryItemDto[]>);

      console.log("results", Object.fromEntries(groupedData))
      return Object.fromEntries(groupedData)
    }
  }, [items])

  return (
    <>
      {groupedItems && (
        <Section title={t('title')}>
          {
            Object.keys(groupedItems).map((key) => {
              const dataList = groupedItems[key] as TransactionHistoryItemDto[];
              console.log("key", key)
              return (
                <Section key={key} title={formatDate(key, "dd MMM")} className="history-list-section">
                  {dataList.map((h, index) => (
                    <ListBlock className="history-list-block">
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
                    </ListBlock>
                  ))}
                </Section>
              );
            })
          }
          
        </Section>
      )}
    </>
  );
}

export default History;
