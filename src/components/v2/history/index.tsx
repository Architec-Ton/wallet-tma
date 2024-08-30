import React, { memo, useMemo } from "react";

import { useHapticFeedback } from "@tma.js/sdk-react";
import type { TransactionHistoryItemDto } from "types/history";

import { iconTrxRecv, iconTrxSend } from "assets/icons/jettons";

import useLanguage from "hooks/useLanguage";
import useRouter from "hooks/useRouter";

import { shortenString } from "components/ui/balance/Address";

import "./styles.css";

interface HistoryProps {
  items?: TransactionHistoryItemDto[];
}

function History({ items }: HistoryProps) {
  const t = useLanguage("history");
  const navigate = useRouter();
  const hapticFeedback = useHapticFeedback();

  const handleExpandClick = () => {
    hapticFeedback.impactOccurred("soft");
    navigate("/histories");
  };

  if (!items) return null;

  return (
    <section>
      <h1 className="history-v2__header">{t("title")}</h1>
      <div className="history-v2__container">
        {items.map((event) => (
          <HistoryEvent
            key={event.utime}
            eventType={event.type}
            eventDescription={t(event.type)}
            eventValue={event.value}
            eventAddress={event.type === "out" ? event.addressTo : event.addressFrom}
            eventTs={event.utime}
            eventSymbol={event.symbol}
          />
        ))}
        <button className="history-v2__item history-v2__expand" onClick={handleExpandClick}>
          See all
        </button>
      </div>
    </section>
  );
}

export const HistoryEvent = memo(
  ({
    eventType,
    eventDescription,
    eventValue,
    eventSymbol,
    eventAddress,
    eventTs,
  }: {
    eventType: string;
    eventDescription: string;
    eventValue: number;
    eventAddress: string;
    eventSymbol: string;
    eventTs: number;
  }) => {
    // HACK: используем французкий для разделения как в дизайне
    const lang = "fr-FR"; // params.initData?.user?.languageCode;

    const icon = useMemo(() => (eventType === "in" ? iconTrxRecv : iconTrxSend), [eventType]);
    const formattedAmount = useMemo(() => {
      const prefix = eventType === "out" ? "-" : "+";
      const amount = new Intl.NumberFormat(lang, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true,
      })
        .format(eventValue)
        .replace(/\s/g, " ");

      return `${prefix}${amount} ${eventSymbol}`;
    }, [eventSymbol, eventType, eventValue]);

    const formattedDate = useMemo(() => {
      const date = new Date(eventTs * 1000);
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);

      const isToday = date.toDateString() === now.toDateString();
      const isYesterday = date.toDateString() === yesterday.toDateString();

      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
      };

      if (isToday) {
        return `Today, ${date.toLocaleTimeString(lang, options)}`;
      } else if (isYesterday) {
        return `Yesterday, ${date.toLocaleTimeString(lang, options)}`;
      } else {
        return `${date.toLocaleDateString(lang, { day: "numeric", month: "long" })}, ${date.toLocaleTimeString(lang, options)}`;
      }
    }, [eventTs, lang]);

    return (
      <div className="history-v2__item">
        <div className="history-v2__item-image-container">
          <img draggable="false" className="history-v2__item-image" src={icon} alt={eventType} />
        </div>
        <div className="history-v2__item-info-container">
          <div className="history-v2__item-info-row">
            <div className="history-v2__normal-text">{eventDescription}</div>
            <div className="history-v2__bold-text" style={{ color: eventType === "out" ? "unset" : "#34C759" }}>
              {formattedAmount}
            </div>
          </div>
          <div className="history-v2__item-info-row">
            <div className="history-v2__default-text">{shortenString(eventAddress)}</div>
            <div className="history-v2__default-text" style={{ textAlign: "right" }}>
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default History;
