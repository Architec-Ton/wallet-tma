import React from "react";

import classNames from "classnames";

import "./Delimiter.styles.css";

import React from "react";

const Delimiter = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <div className={classNames("w-screen delimiter-line", className)}>{children}</div>
);

export default Delimiter;
