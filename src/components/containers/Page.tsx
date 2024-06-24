import { CSSProperties, ReactNode } from 'react';
import './Page.styles.css';
import Container from './Container';
import Title from '../typography/Title';
import Loader from '../layout/Loader';
import { useAppSelector } from '../../hooks/useAppDispatch';
import {selectIsLoading, selectIsNavbarVisible} from '../../features/page/pageSelectors';
import BottomNavBar from "../bottom-nav-bar/BottomNavBar.tsx";
import {walletIcon, accountIcon, newsIcon, appsIcon} from '../../assets/icons/bottom-navbar/index.ts'
import useLanguage from "../../hooks/useLanguage.ts";


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

function Page({
  children,
  style,
  className,
  title,
  titleAccent,
  hintMessage,
}: Props) {


    const t =  useLanguage('Bot-nav-bar')
    const navItems: NavItem[] = [
        { to: '/aaa', icon: walletIcon, label: t('wallet') },
        { to: '/aaa', icon: appsIcon, label: t('apps') },
        { to: '/aaa', icon: newsIcon, label: t('news') },
        { to: '/aaa', icon: accountIcon, label: t('account') },
    ]


  const isLoading = useAppSelector(selectIsLoading);
  const isNavbarVisible =  useAppSelector(selectIsNavbarVisible)
  if (isLoading) return <Loader />;

  return (
    <>
      <Container style={style} className={className}>
        {title && (
          <Title
            title={title}
            titleAccent={titleAccent}
            hintMessage={hintMessage}
          />
        )}
        {children}
        {isNavbarVisible && <BottomNavBar navItems={navItems}/>}
      </Container >
    </>
  );
}

export default Page;
