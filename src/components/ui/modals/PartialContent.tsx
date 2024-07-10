import React, { useEffect } from "react"

type PartialContentPropsType = {
  children: React.ReactNode;
  wait?: any[];
  init: (p: React.ReactNode) => void;
}

const PartialContent = ({children, init, wait = []}: PartialContentPropsType) => {
  useEffect(() => {
    init(children)
  }, [...wait])
  return null
}

export default PartialContent