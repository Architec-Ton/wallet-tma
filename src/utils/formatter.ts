import i18next from "i18next";

export const bigNumberFormatter = (value: number | bigint) => {
  const formatter = new Intl.NumberFormat(i18next.language, {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
};

export function parseTonTransferUrl(
  url: string | undefined
): string | undefined {
  if (url) {
    const regex = /^ton:\/\/transfer\/([a-zA-Z0-9\-_]+)$/;
    const match = url.match(regex);

    if (match) {
      return match[1];
    }
  }
}
