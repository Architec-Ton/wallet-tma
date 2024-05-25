import { useTranslation } from 'react-i18next';
import './Loader.styles.css';

function Loader() {
  const { t } = useTranslation();

  return (
    <>
      <div className="loader">{t('Loading')}....</div>
    </>
  );
}

export default Loader;
