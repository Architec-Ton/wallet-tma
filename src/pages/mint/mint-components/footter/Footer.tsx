//import { useUtils } from '@tma.js/sdk-react';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    children?: ReactNode;
};

function Footer({ children }: Props) {
    //const utils = useUtils();
    const { t } = useTranslation();

    const clickSupport = () => {
        //utils.openTelegramLink('https://t.me/architecton_support');
    };
    return (
        <div
            className={classNames({
                footer: true,
                'footer-shift': !children,
            })}>
            <div>
                <p>
                    {t('footer_our')}{' '}
                    <a href="#" onClick={clickSupport}>
                        {t('footer_support_team')}
                    </a>
                </p>
                <p>{t('footer_in_telegram')}</p>
            </div>
            {children}
        </div>
    );
}

export default Footer;
