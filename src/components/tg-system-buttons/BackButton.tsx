import React, { useEffect } from 'react';
import {useTelegram} from "../../hooks/useTelegram.tsx";
import {useNavigate} from "react-router-dom";

const BackButton: React.FC= () => {

    const navigate = useNavigate();
    const { tg } = useTelegram();


    useEffect(() => {

        const goBack =()=>{
            navigate(-1)
        }

        tg.BackButton.show();
        tg.BackButton.onClick(goBack);

        return () => {
            tg.BackButton.offClick(goBack);
            tg.BackButton.hide();
        };
    }, [navigate, tg]);

    return null;
};

export default BackButton;