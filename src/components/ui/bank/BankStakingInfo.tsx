// import useLanguage from 'hooks/useLanguage';
import React from "react";

import Row from "../../containers/Row";
import ListBaseItem from "../listBlock/ListBaseItem";
import ListBlock from "../listBlock/index";
import "./BankStakingInfo.styles.css";

export interface InfoItems {
  title: string;
  value: string | React.ReactNode;
}

type OwnProps = {
  infoItems: InfoItems[] | undefined;
};

function BankStakingInfo({ infoItems }: OwnProps) {
  //   const t = useLanguage('bank-staking');

  if (!infoItems) {
    return null;
  }

  return (
    <ListBlock>
      {infoItems.map((item, index) => (
        <ListBaseItem key={index}>
          <Row className="space-between w-100">
            <div className="nowrap">{item.title}</div>
            <div>{item.value}</div>
          </Row>
        </ListBaseItem>
      ))}
    </ListBlock>
  );
}

export default BankStakingInfo;
