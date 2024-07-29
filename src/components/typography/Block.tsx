import classNames from 'classnames';
import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './Block.styles.css';

interface OwnProps<T> extends HTMLAttributes<T> {
  children: ReactNode;
  direction?: string;
  style?: CSSProperties;
  className?: string;
};

function Block({ children, style, className, direction = 'column', ...divProps }: OwnProps<HTMLDivElement>) {
  return (
    <div
      style={style}
      className={classNames('block', `block-${direction}`, className)}
      {...divProps}
    >
      {children}
    </div>
  );
}

export default Block;
