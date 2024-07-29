import classNames from "classnames"
import "./Delimiter.styles.css"

const Delimiter = ({ children, className }: { children?: React.ReactNode, className?: string}) => {
  return (
    <div className={classNames("w-screen delimiter-line", className)}>
      {children}
    </div>
  )
}

export default Delimiter