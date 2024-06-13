import Page from '../../components/containers/Page.tsx';
import useLanguage from '../../hooks/useLanguage.ts';
import SHIELD from '../../assets/icons/pages/registration-complete/shield-tick.svg';
import './RegistrationCompleted.style.css';
// import {useNavigate} from "react-router-dom";
// import {useTmaMainButton} from "../../hooks/useTma.ts";
import { useEffect } from 'react';

const RegistrationIsCompleted = () => {
  // const navigate = useNavigate();
  // const btn = useTmaMainButton();
  const t = useLanguage('Registration');
  const description = (
    <p>
      {t('1-description')}
      <span>{t('2-description')}</span>
      {t('3-description')}
    </p>
  );

  useEffect(() => {
    // btn.init(t('next'), () => navigate('/registration/completed'), true);
  }, []);

  return (
    <Page title={t('registration-completed')}>
      {description}
      <div className="imgContainer">
        <img src={SHIELD} alt="Shield" />
      </div>
    </Page>
  );
};

export default RegistrationIsCompleted;
