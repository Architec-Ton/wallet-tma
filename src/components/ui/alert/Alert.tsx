import React from "react";

import classNames from "classnames";

import "./Alert.css";

interface AlertProps {
  text: string;
  isVisible: boolean;
  isWarning: boolean;
}

const Alert: React.FC<AlertProps> = ({ text, isVisible, isWarning }) =>
  isVisible && (
    <div className="alert-container">
      <div className={classNames("alert", { warning: isWarning })}>{text}</div>
    </div>
  );

export default Alert;
