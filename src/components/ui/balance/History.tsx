import React, { useMemo } from "react";

import { format, isToday, isYesterday } from "date-fns";
import type { TransactionHistoryItemDto } from "types/history";

import useLanguage from "hooks/useLanguage";

import { HistoryEvent } from "components/v2/history";

import Section from "../../containers/Section";
import "./History.styles.css";

type Props = {
  items: TransactionHistoryItemDto[] | undefined;
};

function History({ items = [] }: Props) {
  const t = useLanguage("history");

  const groupedItems = useMemo(() => {
    if (items) {
      const groupedData = items.reduce(
        (acc, history: TransactionHistoryItemDto) => {
          const date = new Date(history.utime * 1000);
          const formattedDate = format(date, "yyyy-MM-dd");
          const group = acc.get(formattedDate) || [];
          group.push(history);
          acc.set(formattedDate, group);
          return acc;
        },
        new Map() as Map<string, TransactionHistoryItemDto[]>,
      );

      return Object.fromEntries(groupedData);
    }

    return {};
  }, [items]);

  return (
    <>
      {groupedItems && (
        <Section title={t("title")}>
          {Object.keys(groupedItems).map((key) => {
            const dataList = groupedItems[key] as TransactionHistoryItemDto[];
            const date = new Date(key);
            let displayDate;

            if (isToday(date)) {
              displayDate = "Today";
            } else if (isYesterday(date)) {
              displayDate = "Yesterday";
            } else {
              displayDate = format(date, "dd MMM");
            }

            return (
              <Section key={key} title={displayDate} className="history-list-section">
                {dataList.map((event) => (
                  <div key={event.utime + event.type} className="history-list-item_wrapper">
                    <HistoryEvent
                      eventType={event.type}
                      eventDescription={t(event.type)}
                      eventValue={event.value}
                      eventAddress={event.type === "out" ? event.addressTo : event.addressFrom}
                      eventTs={event.utime}
                      eventSymbol={event.symbol}
                    />
                  </div>
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
