import type { CSSProperties, HTMLAttributes } from "react";
import React from "react";

import classNames from "classnames";

import Row from "../containers/Row";
import Block from "./Block";
import "./Tile.styles.css";

interface OwnProps<T> extends HTMLAttributes<T> {
  icon?: string;
  title?: string;
  description?: string;
  iconAction?: string;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

function Tile({
  icon,
  title,
  description,
  iconAction,
  style,
  className,
  children,
  ...divProps
}: OwnProps<HTMLDivElement>) {
  return (
    <Block style={style} direction="row" className={classNames("tile", className)} {...divProps}>
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
            justifySelf: "end",
          }}
          className="tile-iconaction"
        />
      )}
    </Block>
  );
}

export default Tile;
