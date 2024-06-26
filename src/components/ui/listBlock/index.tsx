import Block from '../../typography/Block'

import './index.css'

type OwnPropsType = {
  children: React.ReactNode
}

const ListBlock = ({ children }: OwnPropsType) => {
  return (
    <Block className="w-full list-block__block">
      {children}
    </Block>
  )
}

export default ListBlock