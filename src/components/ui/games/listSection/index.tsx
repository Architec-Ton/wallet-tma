import { useState } from "react";
import Section from "../../../containers/Section";
import GameListItemGroup from "../listItemGroup";
import { GameListItemType } from "../../../../types/gameTypes";
import {
  iconFilterSquareButton,
  iconSortButton,
} from "../../../../assets/icons/buttons";
import GameFilterModal from "../filterModal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useAppDispatch";
import { selectGamesFilter } from "../../../../features/gaming/gamingSelectors";
import { setFilter } from "../../../../features/gaming/gamingSlice";

type OwnPropsType = {
  title?: string;
  list?: GameListItemType[];
};

const GameListSection = ({ title, list }: OwnPropsType) => {
  const filter = useAppSelector(selectGamesFilter);
  const dispatch = useAppDispatch();
  const [isFilterShow, setIsFilterShow] = useState<boolean>(false);

  const modalHandler = () => {
    setIsFilterShow(!isFilterShow);
  };

  const sortHandler = () => {
    const newFilter = {
      ...filter,
      direction: filter.direction === "desc" ? "asc" : "desc",
    };
    dispatch(setFilter(newFilter));
  };

  const readMore = () => {
    return (
      <div className="read-more__component">
        <img src={iconSortButton} onClick={sortHandler} alt="" />
        <img src={iconFilterSquareButton} onClick={modalHandler} alt="" />
      </div>
    );
  };

  return (
    <Section title={title as string} readMore={readMore()}>
      {list && <GameListItemGroup group={list} />}
      {isFilterShow && <GameFilterModal modalHandler={modalHandler} />}
    </Section>
  );
};

export default GameListSection;
