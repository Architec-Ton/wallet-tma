import classNames from 'classnames'
import Block from '../../typography/Block'

import './index.css'

type OwnPropsType = {
  children: React.ReactNode
  className?: string
}

const ListBlock = ({ children, className }: OwnPropsType) => {
  return (
    <Block className={classNames("w-full list-block__block", className)}>
      {children}
    </Block>
  )
}

export default ListBlock