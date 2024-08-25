import type { CSSProperties, ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { selectIsContinueButtonClicked, selectIsLoading, selectIsNavbarVisible } from "features/page/pageSelectors";
import { setIsContinueButtonClicked } from "features/page/pageSlice";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";

import BackButton from "../buttons/BackButton";
import Loader from "../layout/Loader";
import Title from "../typography/Title";
import MainMenu from "../ui/menu/MainMenu";
import Container from "./Container";
import "./Page.styles.css";

type Props = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  title?: string;
  titleAccent?: string;
  hintMessage?: string;
  pageControl?: ReactNode;
};

const backButtonExclude: string[] = ["/", "/playground", "/news", "/account", "/registration/welcome"];

function Page({ children, style, className, title, titleAccent, hintMessage, pageControl }: Props) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [backButtonIsVisible, setBackButtonIsVisible] = useState<boolean>(false);
  const isLoading = useAppSelector(selectIsLoading);
  const isNavbarVisible = useAppSelector(selectIsNavbarVisible);
  const isContinueButtonClicked = useAppSelector(selectIsContinueButtonClicked);

  useEffect(() => {
    setBackButtonIsVisible(!backButtonExclude.includes(location.pathname) && !isLoading);
  }, [location, isLoading]);

  const handleClickButton = (value: boolean) => dispatch(setIsContinueButtonClicked(value));

  if (isLoading || !isContinueButtonClicked)
    return <Loader isLoading={isLoading} isClicked={isContinueButtonClicked} onClick={handleClickButton} />;

  return (
    <>
      <BackButton visible={backButtonIsVisible} />
      <Container style={style} className={className} key={location.key}>
        {(title || pageControl) && (
          <div className="page-header">
            {title && <Title title={title} titleAccent={titleAccent} hintMessage={hintMessage} />}
            {pageControl}
          </div>
        )}
        {children}
      </Container>

      {isNavbarVisible && <div style={{ height: "var(--spacing-80)" }} />}
      {isNavbarVisible && <MainMenu />}
    </>
  );
}

export default Page;
