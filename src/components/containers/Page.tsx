import {
  CSSProperties,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import "./Page.styles.css";
import Container from "./Container";
import Title from "../typography/Title";
import Loader from "../layout/Loader";
import { useAppSelector } from "../../hooks/useAppDispatch";
import {
  selectIsLoading,
  selectIsNavbarVisible,
} from "../../features/page/pageSelectors";
import BottomNavBar from "../bottom-nav-bar/BottomNavBar.tsx";
import {
  walletIcon,
  accountIcon,
  newsIcon,
  appsIcon,
} from "../../assets/icons/bottom-navbar/index.ts";
import useLanguage from "../../hooks/useLanguage.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { selectIsTma } from "../../features/tma/tmaSelector.ts";
import BackButton from "../buttons/BackButton.tsx";
import useRouter from "../../hooks/useRouter.ts";

interface NavItem {
  to: string;
  icon: string;
  label: string;
}

type Props = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  title?: string;
  titleAccent?: string;
  hintMessage?: string;
};

const backButtonExclude: string[] = [
  "/",
  "/playground",
  "/news",
  "/account",
  "/registration/welcome",
];

function Page({
  children,
  style,
  className,
  title,
  titleAccent,
  hintMessage,
}: Props) {
  const t = useLanguage("Bot-nav-bar");
  const location = useLocation();
  const [backButtonIsVisible, setBackButtonIsVisible] =
    useState<boolean>(false);
  const isLoading = useAppSelector(selectIsLoading);
  const isNavbarVisible = useAppSelector(selectIsNavbarVisible);

  const navItems: NavItem[] = [
    { to: "/", icon: walletIcon, label: t("wallet") },
    { to: "/playground", icon: appsIcon, label: t("apps") },
    { to: "/news", icon: newsIcon, label: t("news") },
    { to: "/account", icon: accountIcon, label: t("account") },
  ];

  useEffect(() => {
    setBackButtonIsVisible(
      !backButtonExclude.includes(location.pathname) && !isLoading
    );
  }, [location, isLoading]);
  if (isLoading) return <Loader />;
  return (
    <>
      <BackButton visible={backButtonIsVisible} />
      <Container style={style} className={className}>
        {title && (
          <Title
            title={title}
            titleAccent={titleAccent}
            hintMessage={hintMessage}
          />
        )}
        {children}
      </Container>
      {isNavbarVisible && <BottomNavBar navItems={navItems} />}
    </>
  );
}

export default Page;
