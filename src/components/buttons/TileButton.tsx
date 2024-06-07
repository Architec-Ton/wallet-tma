import { CSSProperties, MouseEventHandler } from 'react';
import './TileButton.styles.css';

import Tile from '../typography/Tile';
import classNames from 'classnames';

type Props = {
  icon?: string;
  title: string;
  description?: string;
  iconAction?: string;
  style?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
};

function TileButton({
  icon,
  title,
  description,
  iconAction,
  style,
  className,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={classNames('tile-button', className)}
      style={style}>
      <Tile
        icon={icon}
        title={title}
        description={description}
        iconAction={iconAction}
      />
    </button>
  );
}

export default TileButton;
