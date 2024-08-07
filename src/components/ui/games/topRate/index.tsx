import React from "react";

import type { GameListItemType } from "types/gameTypes";

import useLanguage from "hooks/useLanguage";

import GameListSection from "../listSection";

type TopRatePropsType = {
  games?: GameListItemType[];
};

const TopRate = ({ games }: TopRatePropsType) => {
  const t = useLanguage("game");
  if (!games) {
    return null;
  }

  return <GameListSection title={t("top-rated-title")} list={games} />;
};

export default TopRate;
