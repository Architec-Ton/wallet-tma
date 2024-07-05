// import useRouter from "../../hooks/useRouter.ts";
// import useLanguage from "../../hooks/useLanguage.ts";
// import {
//     walletLanguageIcon,
//     mainCurrencyIcon,
//     applicationSubmitIcon,
//     walletSafetyIcon,
//     notificationIcon
// } from '../../assets/icons/settings/index.ts'

// interface Setting {
//     name: string;
//     icon: string;
//     isSettingVisible: boolean;
//     settingValue?: string;
//     onClick: () => void;
// }

// const createSettingsButtons = (): Setting[] => {

//     const navigate = useRouter();
//     const t = useLanguage('account')

//     return [
//         {
//             name: t('wallet-language'),
//             icon: walletLanguageIcon,
//             isSettingVisible: true,
//             settingValue: 'English',
//             onClick: () => navigate('/wallet-language')
//         },
//         {
//             name: t('main-currency'),
//             icon: mainCurrencyIcon,
//             isSettingVisible: true,
//             settingValue: 'USD',
//             onClick: () => navigate("/main-currency")
//         },
//         {
//             name: t('application-submit'),
//             icon: applicationSubmitIcon,
//             isSettingVisible: false,
//             onClick: () => navigate("/application-submit")
//         },
//         {
//             name: t('wallet-safety'),
//             icon: walletSafetyIcon,
//             isSettingVisible: false,
//             onClick: () => navigate("/wallet-safety")
//         },
//         {
//             name: t('notifications'),
//             icon: notificationIcon,
//             isSettingVisible: true,
//             onClick: () => navigate("/notifications")
//         },
//     ]
// }

// export default createSettingsButtons

// export type { Setting };
