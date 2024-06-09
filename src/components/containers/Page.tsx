import { CSSProperties, ReactNode } from 'react';
import './Page.styles.css';
import Container from './Container';
import { usePageState } from '../../hooks/usePage';
import Title from '../typography/Title';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

function Page({ children, style, className }: Props) {
  const { title } = usePageState();
  return (
    <Container style={style} className={className}>
      {title.title && (
        <Title
          title={title.title}
          titleAccent={title.titleAccent}
          hintMessage={title.hintMessage}
        />
      )}
      {children}
    </Container>
  );
}

export default Page;
