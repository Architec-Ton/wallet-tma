import "./WalletMenu.styles.css";
import Menu, { MenuItem } from "./Menu";
import useLanguage from "../../../hooks/useLanguage";
import {} from "../../../assets/icons/bottom-navbar/index.ts";
import {
  iconMenuWalletAdd,
  iconMenuWalletBank,
  iconMenuWalletSend,
  iconMenuWalletSwap,
} from "../../../assets/icons/menus/wallet/index.ts";
import Block from "../../typography/Block.tsx";

function WalletMenu() {
  const t = useLanguage("menu-wallet");

  const menuItems: MenuItem[] = [
    { to: "/wallet/add", icon: iconMenuWalletAdd, label: t("add") },
    { to: "/wallet/send", icon: iconMenuWalletSend, label: t("send") },
    { to: "/wallet/swap", icon: iconMenuWalletSwap, label: t("swap") },
    { to: "/bank", icon: iconMenuWalletBank, label: t("bank") },
  ];

  return <Menu menuItems={menuItems} className="wallet-menu block" />;
}

export default WalletMenu;
