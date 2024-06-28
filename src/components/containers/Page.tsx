import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  selectIsLoading,
  selectIsNavbarVisible,
} from "../../features/page/pageSelectors";
import { useAppSelector } from "../../hooks/useAppDispatch";
import BackButton from "../buttons/BackButton.tsx";
import Loader from "../layout/Loader";
import Title from "../typography/Title";
import MainMenu from "../ui/menu/MainMenu.tsx";
import Container from "./Container";
import "./Page.styles.css";

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

  const location = useLocation();
  const [backButtonIsVisible, setBackButtonIsVisible] =
    useState<boolean>(false);
  const isLoading = useAppSelector(selectIsLoading);
  const isNavbarVisible = useAppSelector(selectIsNavbarVisible);

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
      {isNavbarVisible && <MainMenu />}
    </>
  );
}

export default Page;
