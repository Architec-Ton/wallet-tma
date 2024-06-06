import React, { useEffect, useState } from 'react';
import { useTelegram } from "../../hooks/useTelegram.tsx";
import './MainButton.module.css'

interface MainButtonProps {
    text: string;
    onClick: () => void;
    initialDelay?: number;
}

const MainButton: React.FC<MainButtonProps> = ({ text, onClick, initialDelay = 0 }) => {
    const { tg } = useTelegram();
    const [timeLeft, setTimeLeft] = useState(Math.ceil(initialDelay / 1000));

    useEffect(() => {
        tg.MainButton.show();

        if (initialDelay > 0) {
            const intervalId = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalId);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [initialDelay, tg]);

    useEffect(() => {
        const buttonText = timeLeft === 0 ? text : `${text} ${timeLeft}s`;

        tg.MainButton.setParams({
            text: buttonText,
            // css: {opacity: isButtonActive ? 1 : 0.48}
        });

        if (timeLeft === 0) {
            tg.onEvent('mainButtonClicked', onClick);
        } else {
            tg.offEvent('mainButtonClicked', onClick);
        }

        return () => tg.offEvent('mainButtonClicked', onClick); // Clean up event listener on unmount

    }, [timeLeft, text, tg, onClick]);

    return null;
};

export default MainButton;
