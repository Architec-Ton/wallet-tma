import { ReactNode } from 'react';
import Column from '../../containers/Column';
import ListBaseItem from './ListBaseItem';

type OwnPropsType = {
  icon?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  onClick?: CallableFunction;
};

const ListTileItem = ({
  icon,
  title,
  description,
  children,
  onClick,
}: OwnPropsType) => {
  return (
    <ListBaseItem onClick={onClick}>
      {icon && <img src={icon} alt="" className="list-block__icon" />}
      <Column className="list-block__info">
        {title && <div className="list-block__title">{title}</div>}
        {description && (
          <div className="list-block__description">{description}</div>
        )}
      </Column>
      {children}
    </ListBaseItem>
  );
};

export default ListTileItem;
