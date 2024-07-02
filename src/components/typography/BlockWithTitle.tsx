import classNames from 'classnames';
import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './Block.styles.css';
import './BlockWithTitle.styles.css';
import Title from './Title';

interface OwnProps<T> extends HTMLAttributes<T> {
  title: string;
  titleAccent?: string;
  hintMessage?: string;
  children: ReactNode;
  direction?: string;
  style?: CSSProperties;
  className?: string;
}

function BlockWithTitle({
  title,
  titleAccent,
  hintMessage,
  children,
  style,
  className,
  direction = 'column',
  ...divProps
}: OwnProps<HTMLDivElement>) {
  return (
    <div
      style={style}
      className={classNames(
        'block-with-title',
        'block',
        `block-${direction}`,
        className
      )}
      {...divProps}>
      <Title
        title={title}
        titleAccent={titleAccent}
        hintMessage={hintMessage}
      />
      {children}
    </div>
  );
}

export default BlockWithTitle;
