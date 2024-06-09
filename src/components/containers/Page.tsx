import { CSSProperties, ReactElement, ReactNode } from 'react';
import './Page.styles.css';
import Container from './Container';
import MainButton from '../buttons/MainButton';

type Props = {
  children: ReactNode;
  title?: ReactElement;
  style?: CSSProperties;
  className?: string;
<<<<<<< HEAD
  onAction?: () => void;
  actionTitle?: string;
};

function Page({
  children,
  style,
  className,
  title,
  actionTitle,
  onAction,
}: Props) {
  return (
    <>
      <Container style={style} className={className}>
        {title}
        {children}
      </Container>
      <MainButton title={actionTitle} onClick={onAction} />
    </>
=======
  description?: ReactNode;
};

function Page({ children, style, className, title, description }: Props) {
  return (
    <Container style={style} className={className}>
      {title}
      {description}
      {children}
    </Container>
>>>>>>> remotes/origin/start-page-changes-finish
  );
}

export default Page;
