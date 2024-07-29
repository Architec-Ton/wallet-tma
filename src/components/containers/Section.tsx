import classNames from "classnames"

import "./Section.styles.css"

type SectionProps = {
  children: React.ReactNode
  title?: string
  className?: string
  readMore?: string | React.ReactNode
  readMoreHandle?: () => void
}

const Section = ({ children, title, readMore, className, readMoreHandle }: SectionProps) => {

  return (
    <section className={classNames("section", className)}>
      {(title || readMore) && (
        <div className="section__header"> 
          {title && <h2>{title}</h2>}
          {readMore && <span onClick={readMoreHandle} className="section__read-more">{readMore}</span>}
        </div>
      )}
      <div className="section__body">
        {children}
      </div>
    </section>
  )
}

export default Section