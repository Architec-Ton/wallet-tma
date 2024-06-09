import Page from '../../components/containers/Page.tsx';
import useLanguage from '../../hooks/useLanguage.ts';
import SHIELD from '../../assets/icons/pages/registration-complete/shield-tick.svg';
import './RegistrationCompleted.style.css';
import { usePage } from '../../hooks/usePage.ts';
import { useEffect } from 'react';

const RegistrationIsCompleted = () => {
  const t = useLanguage('Registration');
  const page = usePage();
  //   const description = (
  //     <p>
  //       {t('1-description')}
  //       <span>{t('2-description')}</span>
  //       {t('3-description')}
  //     </p>
  //   );

  useEffect(() => {
    page.setTitle({
      title: t('registration-completed'),
      description: t('1-description'),
    });
  }, []);

  return (
    <Page>
      <div className="imgContainer">
        <img src={SHIELD} alt="Shield" />
      </div>
    </Page>
  );
};

export default RegistrationIsCompleted;
