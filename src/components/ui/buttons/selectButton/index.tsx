import React from "react";

import classNames from "classnames";

import { iconArrowDropdownButton } from "assets/icons/buttons";

import "./index.css";

interface SelectButtonPropsInterface {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const SelectButton = ({ onClick, children, className }: SelectButtonPropsInterface) => {
  return (
    <button onClick={onClick} className={classNames("select-button", className)}>
      {children}
      <img src={iconArrowDropdownButton} alt="" />
    </button>
  );
};

export default SelectButton;
