import Page from "../../components/containers/Page.tsx";
import Title from "../../components/typography/Title.tsx";
import useLanguage from "../../hooks/useLanguage.ts";
import SHIELD from '../../assets/icons/pages/registration-complete/shield-tick.svg'
import './RegistrationCompleted.style.css'


const RegistrationIsCompleted = () => {

    const t = useLanguage('Registration');
    const description = (<p>{t('1-description')}<span>{t('2-description')}</span>{t('3-description')}</p>)

    return (
        <Page
            title={<Title title={t('registration-completed')} /> }
            description={description}>
            <div className='imgContainer'>
                <img src={SHIELD} alt="Shield"/>
            </div>
        </Page>
    );
};

export default RegistrationIsCompleted;