import classNames from 'classnames';
import React, { CSSProperties, HTMLAttributes } from 'react';
import './Tile.styles.css';
import Block from './Block';
import Row from '../containers/Row';

interface OwnProps<T> extends HTMLAttributes<T> {
  icon?: string;
  title?: string;
  description?: string;
  iconAction?: string;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
  isSettingVisible?: boolean;
  keyToStorage?: string;
  settingValue?: string | null;
}

function Tile({
  icon,
  title,
  description,
  iconAction,
  style,
  className,
  children,
  isSettingVisible,
  settingValue,
  ...divProps
}: OwnProps<HTMLDivElement>) {
  return (
    <Block
      style={style}
      direction="row"
      className={classNames('tile', className)}
      {...divProps}
    >
      <Row>
        {icon && <img src={icon} className="tile-icon" />}
        <div className="tile-body">
          <h2>{title}</h2>
          <p>{description}</p>
          {children}
          {isSettingVisible && <div className='setting-value'>{settingValue}</div>}
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
