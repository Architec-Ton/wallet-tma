import {useNavigate} from "react-router-dom";
import React from "react";
import welcomeMessages from "./Welcome-messages.tsx"
import MainButton from "../../tg-system-buttons/MainButton.tsx";
import LinkToSupport from "../../link-to-support/linkToSupport.tsx";

interface WelcomeMessage {
    title: string;
    icon: string;
    message: string;
}

const Welcome: React.FC = () => {
    const navigate = useNavigate();
    const clickFurther = () => {
        navigate('/addWallet')
    }

    return (
        <div>
            <h1>Welcome to Architec.TON</h1>
            {welcomeMessages.map((message: WelcomeMessage, index: number) => (
                <div key={index}>
                    <img src={message.icon} alt={message.title} />
                    <h2>{message.title}</h2>
                    <p>{message.message}</p>
                </div>
            ))}
            <LinkToSupport/>
            <MainButton text={'Further'} onClick={clickFurther}/>
        </div>
    );
};

export default Welcome;