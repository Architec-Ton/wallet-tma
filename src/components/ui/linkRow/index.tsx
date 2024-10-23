import React from "react";

import { useUtils } from "@tma.js/sdk-react";
import { selectIsTma } from "features/tma/tmaSelector";

import { useAppSelector } from "hooks/useAppDispatch";

import Row from "components/containers/Row";

const TmaLinkRow = ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => {
  const utils = useUtils();

  const clickHandler = () => {
    utils.openTelegramLink(to);
  };

  return (
    <Row className={className} onClick={clickHandler}>
      {children}
    </Row>
  );
};

const LinkRow = ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => {
  const isTma = useAppSelector(selectIsTma);

  if (isTma) {
    return (
      <TmaLinkRow to={to} className={className}>
        {children}
      </TmaLinkRow>
    );
  }

  const clickHandler = () => {
    window.open(to, "__blank");
  };

  return (
    <Row className={className} onClick={clickHandler}>
      {children}
    </Row>
  );
};

export default LinkRow;
