import classNames from "classnames";
import { CSSProperties, HTMLAttributes } from "react";
import "./PriceChanges.styles.css";

interface Props<T> extends HTMLAttributes<T> {
  changePrice: number;
  style?: CSSProperties;
  className?: string;
}

function PriceChanges({
  style,
  className,
  changePrice,
}: Props<HTMLDivElement>) {
  return (
    <div
      style={style}
      className={classNames(
        "change-price",
        className,
        changePrice >= 0 ? "change-up" : "change-down"
      )}
    >
      {changePrice >= 0 ? "+" : ""}
      {(changePrice * 100).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}
      {"%"}
    </div>
  );
}

export default PriceChanges;
