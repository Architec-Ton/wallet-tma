import classNames from "classnames"
import "./Grid.styles.css"

type OwnProps = {
  gap?: number
  columns?: number
  rows?: number
  colSpan?: number
  rowSpan?: number
  className?: string
  isOrderedList?: boolean
  children: React.ReactNode
}

const Grid = ({ children, gap, columns, colSpan, rowSpan, rows, isOrderedList, className }: OwnProps) => {
  return (
    <div 
      className={classNames("grid", className, {
        "grid-columns": columns,
        "grid-rows": rows,
        "grid-ordered-list": isOrderedList
      })}
      style={{
        // @ts-ignore
        "--grid-gap": gap || 4,
        "--grid-cols": columns,
        "--grid-rows": rows,
        gridColumn: colSpan ? `span ${colSpan}` : undefined,
        gridRow: rowSpan ? `span ${rowSpan}`: undefined,
      }}
    >
      {children}
    </div>
  )
}

export default Grid