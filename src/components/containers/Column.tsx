import classNames from 'classnames';
import { CSSProperties, ReactNode } from 'react';
import './Column.styles.css';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

function Column({ children, style, className }: Props) {
  return (
    <div style={style} className={classNames('column', className)}>
      {children}
    </div>
  );
}

export default Column;
