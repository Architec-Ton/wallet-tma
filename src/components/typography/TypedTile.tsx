import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import Block from './Block';
import Row from '../containers/Row';

import './TypedTile.styles.css';

type Props = {
  icon?: string;
  typeIcon?: string;
  title?: string;
  description?: string;
  iconAction?: string;
  link?: string;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

function TypedTile({
  icon,
  typeIcon,
  title,
  description,
  iconAction,
  style,
  className,
  onClick,
  children,
}: Props) {
  return (
    <Block
      style={style}
      direction="row"
      className={classNames('typed-tile', className)}
      onClick={onClick}
    >
      <Row>
        {icon && <img src={icon} className="tile-icon" />}
        <div className="tile-body">
          <div className="tile-header">
            {typeIcon && <img src={typeIcon} className="type-icon" alt="" />}
            <h2>{title}</h2>
          </div>
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

export default TypedTile;
