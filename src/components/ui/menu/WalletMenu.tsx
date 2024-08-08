import React from "react";

import {
  iconMenuWalletAdd,
  iconMenuWalletBank,
  iconMenuWalletSend,
  iconMenuWalletSwap,
} from "../../../assets/icons/menus/wallet/index.ts";
import useLanguage from "../../../hooks/useLanguage";
import type { MenuItem } from "./Menu";
import Menu from "./Menu";
import "./WalletMenu.styles.css";

import React from "react";

function WalletMenu() {
  const t = useLanguage("menu-wallet");

  const menuItems: MenuItem[] = [
    { to: "/add-crypto", icon: iconMenuWalletAdd, label: t("add") },
    { to: "/send", icon: iconMenuWalletSend, label: t("send") },
    { to: "/swap", icon: iconMenuWalletSwap, label: t("swap") },
    { to: "/bank", icon: iconMenuWalletBank, label: t("bank") },
  ];

  return <Menu menuItems={menuItems} className="wallet-menu block" />;
}

export default WalletMenu;
