import i18next from "i18next";

export const bigNumberFormatter = (value: number | bigint) => { 
  const formatter = new Intl.NumberFormat(i18next.language, { notation: "compact", maximumFractionDigits: 2 });
  return formatter.format(value)
}
