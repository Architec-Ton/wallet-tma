import classNames from 'classnames';
import { CSSProperties } from 'react';
import './Tile.styles.css';
import Block from './Block';
import Row from '../containers/Row';

type Props = {
  icon?: string;
  title: string;
  description?: string;
  iconAction?: string;
  style?: CSSProperties;
  className?: string;
};

function Tile({
  icon,
  title,
  description,
  iconAction,
  style,
  className,
}: Props) {
  return (
    <Block style={style} className={classNames('tile', className)}>
      <Row>
        {icon && <img src={icon} />}
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </Row>
      {iconAction && (
        <img
          src={iconAction}
          style={{
            justifySelf: 'end',
          }}
        />
      )}
    </Block>
  );
}

export default Tile;
