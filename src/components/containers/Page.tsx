import { CSSProperties, ReactNode } from 'react';
import './Page.styles.css';
import Container from './Container';
import Title from '../typography/Title';
import Loader from '../layout/Loader';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { selectIsLoading } from '../../features/page/pageSelectors';

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
  const isLoading = useAppSelector(selectIsLoading);
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
      </Container>
    </>
  );
}

export default Page;
