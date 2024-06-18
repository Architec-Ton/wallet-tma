import classNames from 'classnames';
import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './Row.styles.css';

interface OwnProps<T> extends HTMLAttributes<T> {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

function Row({ children, style, className, ...divProps }: OwnProps<HTMLDivElement>) {
  return (
    <div style={style} className={classNames('row', className)} {...divProps}>
      {children}
    </div>
  );
}

export default Row;
