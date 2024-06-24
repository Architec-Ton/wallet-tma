import classNames from "classnames"

import "./Section.styles.css"
import { useEffect, useRef } from "react"

type SectionProps = {
  children: React.ReactNode
  title: string
  className?: string
  readMore?: string | React.ReactNode
  readMoreHandle?: () => void
}

const Section = ({ children, title, readMore, className, readMoreHandle }: SectionProps) => {
  const ref = useRef(null)

  useEffect(() => {
    return () => {
      if (ref.current) {
        const readMoreElement = ref.current as HTMLSpanElement
        readMoreElement.removeEventListener("click", () => {})
      }
    }
  }, [])

  useEffect(() => {
    if (readMore && readMoreHandle && ref.current) {
      const readMoreElement = ref.current as HTMLSpanElement
      readMoreElement.addEventListener("click", readMoreHandle)
    }
  }, [readMoreHandle, readMore, ref])

  return (
    <section className={classNames("section", className)}>
      <div className="section__header"> 
        <h2>{title}</h2>
        {readMore && <span ref={ref} className="section__read-more">{readMore}</span>}
      </div>
      <div className="section__body">
        {children}
      </div>
    </section>
  )
}

export default Section