import { useTranslation } from 'react-i18next';

function useLanguage(prefix: string) {
  const { t } = useTranslation();

  const translation = (postfix: string) => {
    return t(`${prefix.toLowerCase()}-${postfix.toLowerCase()}`);
  };

  return translation;
}

export default useLanguage;
