import React from "react";
import Block from "./Block";

import "./DataLossBlock.styles.css"

const DataLossBlock = ({ children }: { children: React.ReactNode}) => {
  return (
    <Block className="history-loss">{children}</Block>
  )
}

export default DataLossBlock