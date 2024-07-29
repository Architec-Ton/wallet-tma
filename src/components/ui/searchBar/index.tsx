import { ChangeEventHandler, useState } from "react"
import { SearchIcon } from '../../../assets/icons/inputs/index.ts'
import Input from "../../inputs/Input"
import { useTranslation } from "react-i18next"

import "./index.css"

type OwnPropsType = {
  onChange: (value: string) => void
  value?: string
}

const SearchIconComponent = () => <img src={SearchIcon} alt="" />

const SearchBar = ({ onChange, value }: OwnPropsType) => {
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = useState<string>(value || '')

  const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value
    setSearchValue(value)
    onChange(value)
  }

  return (
    <Input
      type="text"
      value={searchValue}
      placeholder={t("search")}
      onChange={searchHandler}
      prefix={<SearchIconComponent />}
      className="search-bar"
    />
  )
}

export default SearchBar