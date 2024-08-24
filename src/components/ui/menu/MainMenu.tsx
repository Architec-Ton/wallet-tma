import React from "react";

import {
  iconMenuMainAccount,
  iconMenuMainApps,
  iconMenuMainMarket,
  iconMenuMainNews,
  iconMenuMainWallet,
} from "assets/icons/menus/main/index";

import useLanguage from "hooks/useLanguage";

import "./MainMenu.styles.css";
import type { MenuItem } from "./Menu";
import Menu from "./Menu";

function MainMenu() {
  const t = useLanguage("menu-main");

  const menuItems: MenuItem[] = [
    { to: "/", icon: iconMenuMainWallet, label: t("wallet") },
    { to: "/playground", icon: iconMenuMainApps, label: t("apps") },
    { to: "/market", icon: iconMenuMainMarket, label: t("market") },
    { to: "/news", icon: iconMenuMainNews, label: t("news") },
    { to: "/account", icon: iconMenuMainAccount, label: t("account") },
  ];

  return <Menu menuItems={menuItems} className="main-menu" />;
}

export default MainMenu;
