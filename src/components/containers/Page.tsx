import { CSSProperties, ReactElement, ReactNode } from 'react';
import './Page.styles.css';
import Container from './Container';
import MainButton from '../buttons/MainButton';

type Props = {
  children: ReactNode;
  title?: ReactElement;
  style?: CSSProperties;
  className?: string;
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
  );
}

export default Page;
