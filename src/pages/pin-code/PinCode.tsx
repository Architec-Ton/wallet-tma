import React, {useState, useEffect, useRef} from 'react';
import './PinCode.style.css'
import Page from "../../components/containers/Page.tsx";
import Block from "../../components/typography/Block.tsx";
import {
    keyTabs,
    zeroButtonKeybord,
    bioButtonKeybord,
    delButtonKeybord
} from '../../assets/icons/pincode/index.ts'
import useLanguage from "../../hooks/useLanguage.ts";
import Circle from "../../components/pin-page/Circle.tsx";


interface PinInputProps {
    mode?: 'registration' | 'confirmation';
    onSuccess?: () => void;
    onFailure?: () => void;
}

const PinCode:
    React.FC<PinInputProps> = ({
                                  mode = 'registration',
                                  onSuccess,
                                  onFailure
}) => {

    const t = useLanguage('Pin_code');
    const [pin, setPin] = useState<string>('')
    const [status, setStatus] =useState<'normal'|'error'|'success'>('normal')
    const regPin = useRef('')

    useEffect(() => {
        switch (status) {
            case 'success':
                if (onSuccess) onSuccess();
                break
            case 'normal':
                break
            case 'error':
                setTimeout(() => setStatus('normal'), 300)
                if (onFailure) onFailure();
                break
        }
    }, [status, pin])

    const handleClick = (value: number) => {
        if (pin.length < 4) {
            setPin(pin + value);
        }
    };

    const handleDelete = () => {
            setPin(pin.slice(0, -1));
    };

    const handleBiometry = () => {
        console.log('biometry')
    }

    //todo функция которая позволяет узнать UserId

    const handleSubmit = async () => {
        console.log('handleSubmit')
        if (mode === 'registration') {
            if (!regPin.current) {
                regPin.current = pin
                setPin('')
                console.log('confirm pin')
            } else {
                if (pin === regPin.current) {
                    console.log('reg yes')
                    setStatus('success');
                    //todo сделать нормальные запросы через колбэк
                    // const response = await fetch('/api/register-pin', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({ userId, pin })
                    // });
                    // if (response.ok && onSuccess) {
                    //     onSuccess();
                    //     setStatus('success');
                    //     setPin('')
                    //     regPin.current = ''
                    //     console.log('reg complete')
                    // } else if (onFailure) {
                    //     onFailure();
                    //     setPin('')
                    //     console.log('reg error')
                    // }
                } else {
                    setStatus('error');
                    setPin('')
                    console.log('reg error')
                }
            }
        } else if (mode === 'confirmation'){
            setStatus('error');
            setPin('')
            //todo сделать нормальные запросы через колбэк
            // const response = await fetch('/api/confirm-pin', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ userId, pin})
            // });
            // if (response.ok && onSuccess) {
            //     onSuccess()
            //     setPin('')
            // } else if (onFailure) {
            //     onFailure()
            //     setStatus('error');
            //     setPin('')
            // }
        }
    };

    useEffect(() => {
        if (pin.length === 4) {
            handleSubmit()
        }
    }, [pin]);

    const title = regPin.current && status !== 'error' ? 'confirm' : status

    return (
        <Page>
            <div className='pin-container'>
                <h1 className='pin-title' >{t(title)}</h1>
                <div className="pin-input">
                    <Block direction='row'>
                            {[...Array(4)].map((_, index) => (
                                <Circle key={index} pin={pin} index={index} status={status}/>
                            ))}
                    </Block>
                </div>

                <div className="pin-keypad">
                    {[...Array(9)].map((_, index) => {
                        return <img
                            src={keyTabs[index]}
                            alt={`${index+1}`}
                            key={index}
                            onClick={() => handleClick(index + 1)}
                        />
                    })}
                    <img src={bioButtonKeybord}  onClick={handleBiometry}  alt='biometr'/>
                    <img src={zeroButtonKeybord} onClick={() => handleClick(0)}  alt='0'  />
                    <img  src={delButtonKeybord} onClick={handleDelete}  alt='del'  />
                </div>
            </div>
        </Page>
    );
};

export default PinCode;