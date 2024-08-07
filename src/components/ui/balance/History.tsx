import React, { useMemo } from "react";

import { formatDate } from "date-fns";
import type { TransactionHistoryItemDto } from "types/history";

import { iconTrxRecv, iconTrxSend } from "assets/icons/jettons";

import useLanguage from "hooks/useLanguage";

import Section from "../../containers/Section";
import ListBlock from "../listBlock";
import ListTileItem from "../listBlock/ListTileItem";
import { shortenString } from "./Address";
import "./History.styles.css";

type Props = {
  items: TransactionHistoryItemDto[] | undefined;
};

function History({ items = [] }: Props) {
  //   const ton = useTon();
  const t = useLanguage("history");
  // const navigate = useNavigate();

  const groupedItems = useMemo(() => {
    if (items) {
      const groupedData = items.reduce(
        (acc, history: TransactionHistoryItemDto) => {
          const date = formatDate(new Date(history.utime * 1000).toString(), "yyyy-MM-dd");
          const group = acc.get(date) || [];
          group.push(history);
          acc.set(date, group);
          return acc;
        },
        new Map() as Map<string, TransactionHistoryItemDto[]>,
      );

      return Object.fromEntries(groupedData);
    }
  }, [items]);

  return (
    <>
      {groupedItems && (
        <Section title={t("title")}>
          {Object.keys(groupedItems).map((key) => {
            const dataList = groupedItems[key] as TransactionHistoryItemDto[];
            return (
              <Section key={key} title={formatDate(key, "dd MMM")} className="history-list-section">
                {dataList.map((h, index) => (
                  <ListBlock className="history-list-block" key={`${key}-${index}`}>
                    <ListTileItem
                      icon={h.type === "in" ? iconTrxRecv : iconTrxSend}
                      title={t(h.type)}
                      description={shortenString(h.addressTo)}
                      // onClick={assetClickHandler(asset)}
                    >
                      <div className="list-block__right">
                        <div
                          className={`list-block__title ${h.type === "in" ? "change-up" : ""} `}
                        >{`${h.value ? h.value : ""} ${h.symbol}`}</div>
                        <div className="list-block__description">{new Date(h.utime * 1000).toLocaleString()}</div>
                      </div>
                    </ListTileItem>
                  </ListBlock>
                ))}
              </Section>
            );
          })}
        </Section>
      )}
    </>
  );
}

export default History;
