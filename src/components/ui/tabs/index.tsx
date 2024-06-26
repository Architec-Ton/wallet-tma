import classNames from "classnames"
import Grid from "../../containers/Grid"
import Block from "../../typography/Block"

import "./index.css"

type TabsPropsType = {
  children: React.ReactNode
  className?: string
}

const Tabs = ({ children, className }: TabsPropsType) => {
  return (
    <Block className="tabs-block">
      <Grid className={classNames("tabs", className)}>
        {children}
      </Grid>
    </Block>
  )
}

export default Tabs