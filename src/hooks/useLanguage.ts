import { useTranslation } from 'react-i18next';

function useLanguage(prefix: string) {
  const { t } = useTranslation();

  const translation = (postfix: string, prefix2?: string) => {
    if (prefix2) {
      return t(`${prefix2.toLowerCase()}-${postfix.toLowerCase()}`);
    } else {
      return t(`${prefix.toLowerCase()}-${postfix.toLowerCase()}`);
    }
  };

  return translation;
}

export default useLanguage;
