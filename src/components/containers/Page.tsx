import { CSSProperties, ReactNode } from 'react';
import './Page.styles.css';
import Container from './Container';
import Title from '../typography/Title';
import Loader from '../layout/Loader';
import { useAppSelector } from '../../hooks/useAppDispatch';
import {
  selectIsLoading,
  selectTitle,
} from '../../features/page/pageSelectors';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

function Page({ children, style, className }: Props) {
  const isLoading = useAppSelector(selectIsLoading);
  const title = useAppSelector(selectTitle);
  if (isLoading) return <Loader />;
  return (
    <>
      <Container style={style} className={className}>
        {title && (
          <Title
            title={title.title}
            titleAccent={title.titleAccent}
            hintMessage={title.hintMessage}
          />
        )}
        {children}
      </Container>
    </>
  );
}

export default Page;
