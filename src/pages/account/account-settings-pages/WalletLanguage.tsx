import React, { useEffect } from "react";

import Page from "../../../components/containers/Page";
import SelectorTile from "../../../components/ui/selector-tile/SelectorTile";
import useLanguage from "../../../hooks/useLanguage";
import { usePage } from "../../../hooks/usePage";

const WalletLanguage = () => {
  const languages = [
    {
      language: "English",
      description: "English — Hello",
    },
    {
      language: "Russian",
      description: "Русский — Привет",
    },
  ];

  const onItemSelected = () => {};

  const t = useLanguage("account");
  const page = usePage();

  useEffect(() => {
    page.setLoading(false, false);
  }, []);

  return (
    <Page title={t("wallet-language")}>
      <SelectorTile
        selectItems={languages.map((lang) => ({ type: "object", value: lang }))}
        onItemSelected={onItemSelected}
      />
    </Page>
  );
};

export default WalletLanguage;
