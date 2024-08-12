import { useEffect } from "react";

import Page from "../../components/containers/Page";
import Block from "../../components/typography/Block";
import useLanguage from "../../hooks/useLanguage";
import { usePage } from "../../hooks/usePage";

// import TileButton from '../../components/buttons/TileButton.tsx';
// import createSettingsButtons from './settings-buttons.ts';

function Account() {
  const t = useLanguage("account");
  const page = usePage();

  useEffect(() => {
    page.setLoading(false, true);
  }, []);

  // const initialSettings = createSettingsButtons();

  return (
    <Page title={t("account")}>
      <Block>AccountTile</Block>
      <h1>{t("settings")}</h1>
      {/* {initialSettings.map((btn, index) => {
        return (
          <TileButton
            key={index}
            icon={btn.icon}
            title={btn.name}
            onClick={btn.onClick}
            isSettingVisible={btn.isSettingVisible}
          />
        );
      })} */}
    </Page>
  );
}

export default Account;
