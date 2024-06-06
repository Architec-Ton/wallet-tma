import classNames from 'classnames';
import { CSSProperties, ReactNode } from 'react';
import './Block.styles.css';

type Props = {
  children: ReactNode;
  direction?: string;
  style?: CSSProperties;
  className?: string;
};

function Block({ children, style, className, direction = 'column' }: Props) {
  return (
    <div
      style={style}
      className={classNames('block', `block-${direction}`, className)}>
      {children}
    </div>
  );
}

export default Block;
