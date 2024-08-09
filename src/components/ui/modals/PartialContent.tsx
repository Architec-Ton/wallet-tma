import React from "react";

type PartialContentPropsType = {
  children: React.ReactNode;
  wait?: any[];
  init: (p: React.ReactNode) => void;
};

const PartialContent = ({ children, init, wait = [] }: PartialContentPropsType) => {
  React.useEffect(() => {
    init(children);
  }, [...wait]);
  return null;
};

export default PartialContent;
