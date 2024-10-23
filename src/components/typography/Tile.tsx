import type { CSSProperties, HTMLAttributes } from "react";
import React from "react";

import cn from "classnames";

import { LogoSVG } from "components/ui/listBlock/ListBlockItem";

import Row from "../containers/Row";
import Block from "./Block";
import "./Tile.styles.css";
import {lockIcon} from "assets/icons/buttons";

interface OwnProps<T> extends HTMLAttributes<T> {
  icon?: string;
  title?: string;
  description?: string;
  iconAction?: string;
  style?: CSSProperties;
  className?: string;
  isVerified?: boolean;
  info?: string | number;
  children?: React.ReactNode;
  maxHeightIcon?: string;
}

function Tile({
  icon,
  title,
  description,
  iconAction,
  style,
  className,
  isVerified,
  children,
  info,
  maxHeightIcon,
  ...divProps
}: OwnProps<HTMLDivElement>) {
  return (
    <Block style={style} direction="row" className={cn("tile", className)} {...divProps}>
      <Row>
        {icon && <GameIcon icon={icon} framed={!!isVerified} maxHeightIcon={maxHeightIcon}/>}
        <div className="tile-body">
          <h2 className="tile-header2">
            {title} {isVerified && <VerifiedIcon />}
          </h2>
          <p>{description}</p>
          {children}
        </div>
      </Row>
        { info !=='0' ? (
            <div style={{
                justifySelf: "end",
            }}>
                {info}
            </div>
        ) :
            <img src={lockIcon} alt="lock"/>
        }
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

const GameIcon = ({ icon, framed,maxHeightIcon }: { icon: string; framed: boolean }) => (
  <div className="tile-icon-wrapper" style={{ height: framed ? "var(--thumbnail-height)" : "unset" }}>
    <img
        src={icon}
        alt=""
        className={cn({ "tile-icon": true, "tile-icon--framed": framed })}
        style={{
          maxHeight: maxHeightIcon || undefined
        }}
    />

    {framed && (
      <div className="tile-icon--framed-logo">
        <LogoSVG />
      </div>
    )}

    {framed && <div className="tile-icon--framed-gradient" />}
  </div>
);

const VerifiedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.33879 2.35423C8.73871 0.5838 11.2613 0.5838 11.6612 2.35423C11.9204 3.50164 13.2371 4.04705 14.2317 3.41897C15.7664 2.44987 17.5501 4.23361 16.581 5.76827C15.953 6.76289 16.4984 8.07961 17.6458 8.33879C19.4162 8.73871 19.4162 11.2613 17.6458 11.6612C16.4984 11.9204 15.953 13.2371 16.581 14.2317C17.5501 15.7664 15.7664 17.5501 14.2317 16.581C13.2371 15.953 11.9204 16.4984 11.6612 17.6458C11.2613 19.4162 8.73871 19.4162 8.33879 17.6458C8.07961 16.4984 6.76289 15.953 5.76827 16.581C4.23361 17.5501 2.44987 15.7664 3.41897 14.2317C4.04705 13.2371 3.50164 11.9204 2.35423 11.6612C0.5838 11.2613 0.5838 8.73871 2.35423 8.33879C3.50164 8.07961 4.04705 6.76289 3.41897 5.76827C2.44987 4.23361 4.23361 2.44987 5.76827 3.41897C6.76289 4.04705 8.07961 3.50164 8.33879 2.35423Z"
      fill="#07ACFF"
    />
    <path
      d="M6.25 10L8.75 12.5L13.75 7.5"
      stroke="white"
      strokeWidth="1.875"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Tile;
