import { CSSProperties, ReactElement, ReactNode } from 'react';
import './Page.styles.css';
import Container from './Container';

type Props = {
  children: ReactNode;
  title?: ReactElement;
  style?: CSSProperties;
  className?: string;
};

function Page({ children, style, className, title }: Props) {
  return (
    <Container style={style} className={className}>
      {title}
      {children}
    </Container>
  );
}

export default Page;
