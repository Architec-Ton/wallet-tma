import ListBlock from ".";
import { ItemDto } from "../../../types/list";
import Column from "../../containers/Column";
import ListBaseItem from "./ListBaseItem";
import "./ListItem.styles.css";

type OwnPropsType = {
  items: ItemDto[];
  onClick?: (item: ItemDto) => void;
};

const ListItem = ({ items, onClick }: OwnPropsType) => {
  return (
    <>
      {items && items.length > 0 && (
        <ListBlock className="listitem-info-block">
          {items.map((item, index) => (
            <ListBaseItem
              key={index}
              onClick={() => {
                if (onClick) onClick(item);
              }}
            >
              <div>{item.title}</div>
              <Column className="listitem-info-block-body">
                <div>{item.value}</div>
                {item.subvalue && (
                  <div className="secondary-data">{item.subvalue}</div>
                )}
              </Column>
            </ListBaseItem>
          ))}
        </ListBlock>
      )}
    </>
  );
};

export default ListItem;
