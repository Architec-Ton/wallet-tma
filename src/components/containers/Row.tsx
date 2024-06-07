import classNames from 'classnames';
import { CSSProperties, ReactNode } from 'react';
import './Row.styles.css';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

function Row({ children, style, className }: Props) {
  return (
    <div style={style} className={classNames('row', className)}>
      {children}
    </div>
  );
}

export default Row;
