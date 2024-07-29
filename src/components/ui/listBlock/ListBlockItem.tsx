import Column from "../../containers/Column";
import ListBaseItem from "./ListBaseItem";

type OwnPropsType = {
  thumb?: string;
  title?: string;
  description?: string;
  iconAction?: string;
  onClick?: CallableFunction;
};

const ListBlockItem = ({
  thumb,
  title,
  description,
  iconAction,
  onClick,
}: OwnPropsType) => {
  return (
    <ListBaseItem onClick={onClick}>
      {thumb && <img src={thumb} alt="" className="list-block__icon" />}
      <Column className="list-block__info">
        {title && <div className="list-block__title">{title}</div>}
        {description && (
          <div className="list-block__description">{description}</div>
        )}
      </Column>
      {iconAction && (
        <img src={iconAction} alt="" className="list-block__button" />
      )}
    </ListBaseItem>
  );
};

export default ListBlockItem;
