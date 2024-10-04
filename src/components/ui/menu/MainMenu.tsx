import React, { useMemo } from "react";

import {
  iconMenuMainAccount,
  iconMenuMainApps,
  iconMenuMainMarket,
  iconMenuMainNews,
  iconMenuMainWallet,
} from "assets/icons/menus/main/index";

import useIsIphone from "hooks/useIsIphone";
import useLanguage from "hooks/useLanguage";

import "./MainMenu.styles.css";
import type { MenuItem } from "./Menu";
import Menu from "./Menu";

function MainMenu() {
  const t = useLanguage("menu-main");
  const isIphone = useIsIphone();

  const menuItems = useMemo(() => {
    const accumulator: MenuItem[] = [];

    accumulator.push({ to: "/", icon: iconMenuMainWallet, label: t("wallet") });

    accumulator.push({ to: "/playground", icon: iconMenuMainApps, label: t("apps") });

    if (!isIphone) {
      accumulator.push({ to: "/market", icon: iconMenuMainMarket, label: t("market") });
    }

    accumulator.push({ to: "/news", icon: iconMenuMainNews, label: t("news") });

    accumulator.push({ to: "/account", icon: iconMenuMainAccount, label: t("account") });

    return accumulator;
  }, [t, isIphone]);

  return <Menu menuItems={menuItems} className="main-menu" />;
}

export default MainMenu;
