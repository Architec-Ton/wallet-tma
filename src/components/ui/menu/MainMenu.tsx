import {
  iconMenuMainAccount,
  iconMenuMainApps,
  iconMenuMainNews,
  iconMenuMainWallet,
} from "../../../assets/icons/menus/main/index.ts";
import useLanguage from "../../../hooks/useLanguage";
import "./MainMenu.styles.css";
import Menu, { MenuItem } from "./Menu";

function MainMenu() {
  const t = useLanguage("menu-main");

  const menuItems: MenuItem[] = [
    { to: "/", icon: iconMenuMainWallet, label: t("wallet") },
    { to: "/playground", icon: iconMenuMainApps, label: t("apps") },
    { to: "/news", icon: iconMenuMainNews, label: t("news") },
    { to: "/account", icon: iconMenuMainAccount, label: t("account") },
  ];

  return <Menu menuItems={menuItems} className="main-menu" />;
}

export default MainMenu;
