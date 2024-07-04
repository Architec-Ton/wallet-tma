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
  isSettingVisible?: boolean;
  settingValue?: string | null;
};

function TileButton({
  icon,
  title,
  description,
  iconAction,
  style,
  className,
  onClick,
  isSettingVisible,
  settingValue
}: Props) {
  return (
    <button
      onClick={onClick}
      className={classNames('tile-button', className)}
      style={style}
    >
      <Tile
        icon={icon}
        title={title}
        description={description}
        iconAction={iconAction}
        isSettingVisible={isSettingVisible}
        settingValue={settingValue}
      />
    </button>
  );
}

export default TileButton;
