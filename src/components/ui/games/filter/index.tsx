import type { ChangeEventHandler } from "react";
import React, { useMemo } from "react";

import { selectGamesFilter } from "features/gaming/gamingSelectors";
import { clearFilter, setFilter } from "features/gaming/gamingSlice";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useLanguage from "hooks/useLanguage";

import Block from "components/typography/Block";

const GameListFilter = () => {
  const t = useLanguage("game");
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectGamesFilter);

  const filtersStatus = useMemo(
    () => ({
      name: filter.name ? t("filter-on") : t("filter-off"),
      rate: filter.rate ? t("filter-on") : t("filter-off"),
      date: filter.date ? t("filter-on") : t("filter-off"),
    }),
    [filter],
  );

  const filterHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.currentTarget;
    const { checked, name } = target;
    const updatedFilter = { ...filter, [name]: !!checked };

    dispatch(setFilter(updatedFilter));
  };

  const clearHandler = () => {
    dispatch(clearFilter());
  };

  return (
    <>
      <Block className="filter-row">
        <label className="w-full">
          <div>Sort by name</div>
          <input type="checkbox" name="name" checked={filter.name} onChange={filterHandler} />
          <span>{filtersStatus.name}</span>
        </label>
      </Block>
      <Block className="filter-row">
        <label className="w-full">
          <div>Sort by rating</div>
          <input type="checkbox" name="rate" checked={filter.rate} onChange={filterHandler} />
          <span>{filtersStatus.rate}</span>
        </label>
      </Block>
      <Block className="filter-row">
        <label className="w-full">
          <div>Sort by newest</div>
          <input type="checkbox" name="date" checked={filter.date} onChange={filterHandler} />
          <span>{filtersStatus.date}</span>
        </label>
      </Block>
      <Block className="filter-row">
        <label className="w-full" onClick={clearHandler}>
          <span>Clear filter</span>
        </label>
      </Block>
    </>
  );
};

export default GameListFilter;
