import { CSSProperties, ReactNode } from "react";

import classNames from "classnames";

import "./Container.styles.css";

type Props = {
  children: ReactNode;
  direction?: string;
  style?: CSSProperties;
  className?: string;
};

function Container({ children, style, className, direction = "column" }: Props) {
  return (
    <div style={style} className={classNames("container", `container-${direction}`, className)}>
      {children}
    </div>
  );
}

export default Container;
