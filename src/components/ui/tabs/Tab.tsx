import React from "react";

import classNames from "classnames";

import "./Tab.style.css";

import React from "react";

type TabPropsType = {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
};

const Tab = ({ children, isActive, onClick }: TabPropsType) => (
  <div className={classNames("tab round-medium", { "active-tab": isActive })} onClick={onClick}>
    {children}
  </div>
);

export default Tab;
