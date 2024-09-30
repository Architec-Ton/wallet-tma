import React from "react";

import classNames from "classnames";

import { iconArrowDropdownButton } from "assets/icons/buttons";

import "./index.css";

interface SelectButtonPropsInterface {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  placeHolder?: string;
}

const SelectButton = ({ onClick, children, className, placeHolder }: SelectButtonPropsInterface) => {
  return (
    <button onClick={onClick} className={classNames("select-button", className)}>
      {children || <span className="select-button-placeholder">{placeHolder}</span>}
      <img src={iconArrowDropdownButton} alt="" />
    </button>
  );
};

export default SelectButton;
