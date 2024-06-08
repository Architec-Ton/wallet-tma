import { CSSProperties, ReactElement, ReactNode } from 'react';
import './Page.styles.css';
import Container from './Container';

type Props = {
  children: ReactNode;
  title?: ReactElement;
  style?: CSSProperties;
  className?: string;
  description?: ReactNode;
};

function Page({ children, style, className, title, description }: Props) {
  return (
    <Container style={style} className={className}>
      {title}
      {description}
      {children}
    </Container>
  );
}

export default Page;
