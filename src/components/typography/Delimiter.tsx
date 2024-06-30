import "./Delimiter.styles.css"

const Delimiter = ({ children }: { children?: React.ReactNode}) => {
  return (
    <div className="w-screen delimiter-line">
      {children}
    </div>
  )
}

export default Delimiter