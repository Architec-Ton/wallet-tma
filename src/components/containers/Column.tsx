import classNames from 'classnames';
import { CSSProperties, ReactNode } from 'react';
import './Column.styles.css';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  columns?: number;
};

function Column({ children, style, className, columns }: Props) {
  if (columns) {
    style = {
      ...style,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', //`repeat(${columns}, 0.5fr)`,
    };
  }

  return (
    <div style={style} className={classNames('column', className)}>
      {children}
    </div>
  );
}

export default Column;
