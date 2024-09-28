import type { CSSProperties, MouseEventHandler } from "react";
import React from "react";

import classNames from "classnames";

import Tile from "../typography/Tile";
import "./TileButton.styles.css";

type Props = {
  icon?: string;
  title?: string;
  description?: string;
  iconAction?: string;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  children?: React.ReactNode;
};

function TileButton({ icon, title, description, iconAction, style, className, disabled, onClick, children }: Props) {
  return (
    <button onClick={onClick} className={classNames("tile-button", className)} style={style} disabled={disabled}>
      <Tile icon={icon} title={title} description={description} iconAction={iconAction}>
        {children}
      </Tile>
    </button>
  );
}

export default TileButton;
