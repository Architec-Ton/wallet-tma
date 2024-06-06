import { useContext, createContext } from 'react';

declare global {
    interface Window {
        Telegram: any;
    }
}
interface Telegram {
    MainButton: {
        isVisible: boolean;
        show: () => void;
        hide: () => void;
        setParams: (params: { text: string }) => void;
        // onEvent: (eventType: string, callback: () => void) => void;
        // offEvent: (eventType: string, callback: () => void) => void;
    };
    BackButton: {
        show: () => void;
        hide: () => void;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
    };
    onEvent: (eventType: string, callback: () => void) => void;
    offEvent: (eventType: string, callback: () => void) => void;
}

const tg: Telegram = window.Telegram.WebApp;
const TelegramContext = createContext({ tg });

export const useTelegram = () => useContext(TelegramContext);

export default tg;
