import { CSSProperties, ReactNode, useEffect } from 'react';
import './Page.styles.css';
import Container from './Container';
import { usePageState } from '../../hooks/usePage';
import Title from '../typography/Title';
import Loader from '../layout/Loader';
import { useTmaState } from '../../hooks/useTma';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

function Page({ children, style, className }: Props) {
  const { title, setTitle, setIsLoading, isLoading } = usePageState();
  const { isTmaLoading } = useTmaState();
  useEffect(() => {
    console.log('isTmaLoading', isTmaLoading, isLoading);
    setTitle({});
  }, []);
  useEffect(() => setIsLoading(isTmaLoading), [setIsLoading, isTmaLoading]);

  if (isLoading) return <Loader />;

  console.log('page ok', isLoading);

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
