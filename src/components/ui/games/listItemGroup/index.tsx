import { useNavigate } from 'react-router-dom';
import { iconButtonArraw } from '../../../../assets/icons/buttons';
import { GameListItemType } from '../../../../types/gameTypes';
import ListBlock from '../../listBlock';
import ListBlockItem from '../../listBlock/ListBlockItem';
import { useClosure } from '../../../../hooks/useClosure';

import './index.css';

type OwnPropsType = {
  group: GameListItemType[];
};

const GameListItemGroup = ({ group }: OwnPropsType) => {
  const navigate = useNavigate();

  const clickHandler = useClosure((id) => {
    navigate(`/playground/${id}`);
  });

  return (
    <ListBlock>
      {group.map((item: GameListItemType) => {
        return (
          <ListBlockItem
            key={item.id}
            thumb={item.icon}
            title={item.title}
            iconAction={iconButtonArraw}
            description={item.subtitle}
            onClick={clickHandler(item.id)}
          />
        );
      })}
    </ListBlock>
  );
};

export default GameListItemGroup;
