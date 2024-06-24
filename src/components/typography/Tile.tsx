import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import './Tile.styles.css';
import Block from './Block';
import Row from '../containers/Row';

type Props = {
  icon?: string;
  title?: string;
  description?: string;
  iconAction?: string;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

function Tile({
  icon,
  title,
  description,
  iconAction,
  style,
  className,
  children,
}: Props) {
  return (
    <Block
      style={style}
      direction="row"
      className={classNames('tile', className)}>
      <Row>
        {icon && <img src={icon} className="tile-icon" />}
        <div className="tile-body">
          <h2>{title}</h2>
          <p>{description}</p>
          {children}
        </div>
      </Row>
      {iconAction && (
        <img
          src={iconAction}
          style={{
            justifySelf: 'end',
          }}
          className="tile-iconaction"
        />
      )}
    </Block>
  );
}

export default Tile;
