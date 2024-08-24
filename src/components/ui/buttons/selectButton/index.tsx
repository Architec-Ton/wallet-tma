import React from "react";

import "./index.css"
import classNames from "classnames";
import { iconArrowDropdownButton } from "assets/icons/buttons";

interface SelectButtonPropsInterface {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const SelectButton = ({onClick, children, className}: SelectButtonPropsInterface) => {
  return (
    <button onClick={onClick} className={classNames("select-button", className)}>
      {children}
      <img src={iconArrowDropdownButton} alt="" />
    </button>
  )
}

export default SelectButton