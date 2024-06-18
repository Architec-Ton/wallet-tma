import classNames from "classnames"

import "./Section.styles.css"

type SectionProps = {
  children: React.ReactNode
  title: string
  className?: string
  readMore?: string
  readMoreHandle?: () => void
}

const Section = ({ children, title, readMore, className, readMoreHandle }: SectionProps) => {
  return (
    <section className={classNames("section", className)}>
      <div className="section__header">
        <h2>{title}</h2>
        {readMore && <span className="section__read-more" onClick={readMoreHandle}>{readMore}</span>}
      </div>
      <div className="section__body">
        {children}
      </div>
    </section>
  )
}

export default Section