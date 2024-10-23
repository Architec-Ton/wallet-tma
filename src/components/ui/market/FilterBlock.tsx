import React from "react";

import classNames from "classnames";

import { iconArrowDropdownButton } from "assets/icons/buttons";

import Column from "components/containers/Column";
import Row from "components/containers/Row";
import Block from "components/typography/Block";

import "./FilterBlock.styles.css";

type FilterBlockProps = {
  title: string;
  value?: string;
  onClick?: () => void;
  withIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const FilterBlock = ({ title, value, onClick, withIcon, className, children }: FilterBlockProps) => {
  return (
    <Block onClick={onClick} className={classNames("p2p-filter__block", className)}>
      <Row>
        <Column>
          <div className="p2p-filter__block_title">{title}</div>
          <div className="p2p-filter__block_value">
            {value}
            {children}
          </div>
        </Column>
        {withIcon && (
          <div className="p2p-filter__block_icon">
            <img src={iconArrowDropdownButton} alt="" />
          </div>
        )}
      </Row>
    </Block>
  );
};

export default FilterBlock;
