import React, { useEffect, useState } from "react";

import classNames from "classnames";

import Block from "components/typography/Block";

import SelectButton from "../buttons/selectButton";
import ListBlock from "../listBlock";
import ListBaseItem from "../listBlock/ListBaseItem";
import "./index.css";

export interface DropDownDto {
  key: string;
  value: string;
}

export type DropDownPropsType = {
  defaultValue?: DropDownDto;
  data: DropDownDto[];
  placeHodler?: string;
  onChange: (v: DropDownDto | undefined) => void;
  className?: string;
};

const DropDown = ({ data, defaultValue, placeHodler, className, onChange }: DropDownPropsType) => {
  const [showList, setShowList] = useState<boolean>(false);

  const clickHandler = (value: string) => {
    const dataItem: DropDownDto | undefined = data.find((dropDown) => dropDown.key === value);
    openHandler();
    onChange(dataItem);
  };

  const openHandler = () => {
    setShowList(!showList);
  };
  return (
    <div className="dropdown">
      <SelectButton onClick={openHandler}>{defaultValue?.value || placeHodler || "Select"}</SelectButton>
      {showList && (
        <ListBlock className={classNames("dropdown-list", className)}>
          {data.map((dropDownItem) => {
            return (
              <ListBaseItem
                key={dropDownItem.key}
                className={defaultValue && defaultValue.key === dropDownItem.key ? "checked" : ""}
                onClick={() => clickHandler(dropDownItem.key)}
              >
                {dropDownItem.value}
              </ListBaseItem>
            );
          })}
        </ListBlock>
      )}
    </div>
  );
};

export default DropDown;
