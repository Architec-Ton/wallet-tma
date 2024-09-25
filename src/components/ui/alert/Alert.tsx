import React from "react";

import "./Alert.css";
import classNames from "classnames";

interface AlertProps {
  text: string;
  isVisible: boolean;
  isWarning: boolean;
}

const Alert: React.FC<AlertProps> = ({ text, isVisible, isWarning }) => (
    isVisible && (
      <div className="alert-container">
        <div className={classNames("alert", {"warning": isWarning})}>{text}</div>
      </div>
    )
  );

export default Alert;
