import { Trans } from "react-i18next"

type FormatMessageProps = {
  children: React.ReactNode
  components?: any
}

const FormatMessage = ({ children, components }: FormatMessageProps) => {
  return (
    <Trans components={components}>
      {children}
    </Trans>
  )
}

export default FormatMessage