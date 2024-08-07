import React from "react";

import classNames from "classnames";

import inlineLoader from "assets/loties/inline-loader.svg";

import "./index.css";

const InlineLoader = ({ className }: { className?: string }) => (
  <img src={inlineLoader} alt="" className={classNames("inline-loader", className)} />
);

export default InlineLoader;
