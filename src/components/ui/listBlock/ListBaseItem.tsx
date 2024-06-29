import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import Row from "../../containers/Row";
import classNames from "classnames";

type PropsType = {
  children?: ReactNode;
  onClick?: CallableFunction;
  style?: CSSProperties;
  className?: string;
};

const ListBaseItem = ({ children, onClick, style, className }: PropsType) => {
  const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <Row
      className={classNames("list-block", className)}
      style={style}
      onClick={clickHandler}
    >
      {children}
    </Row>
  );
};

export default ListBaseItem;
