import { ChangeEventHandler, useState } from "react"
import { SearchIcon } from '../../../assets/icons/inputs/index.ts'
import Input from "../../inputs/Input"
import { useTranslation } from "react-i18next"


type OwnPropsType = {
  onChange: (value: string) => void
}

const SearchIconComponent = () => <img src={SearchIcon} alt="" />

const SearchBar = ({ onChange }: OwnPropsType) => {
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = useState<string>('')

  const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value
    setSearchValue(value)
    onChange(value)
  }

  return (
    <Input type="text" value={searchValue} placeholder={t("search")} onChange={searchHandler} prefix={<SearchIconComponent />} />
  )
}

export default SearchBar