import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { hideAlert } from '../../../features/alert/alertSlice.ts';
import Alert from "./Alert.tsx";
import useLanguage from "../../../hooks/useLanguage.ts";

const AlertContainer: React.FC = () => {
    const dispatch = useDispatch();
    const t = useLanguage('copy')
    const { isVisible, message, duration } = useSelector((state: RootState) => state.alert);
    const [messageToAlert, setMessageToAlert] = useState('')

    useEffect(() => {
        if (message === 'copy') {
            setMessageToAlert(t('copied-to-clipboard'))
        } else {
            setMessageToAlert(message)
        }
    }, [message]);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => dispatch(hideAlert()), duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, dispatch]);

    return <Alert text={messageToAlert} isVisible={isVisible} />;
};

export default AlertContainer;
