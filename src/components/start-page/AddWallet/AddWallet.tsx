import {useNavigate} from "react-router-dom";
import WalletButtons from "./AddWallet-buttons.tsx";
import BackButton from "../../tg-system-buttons/BackButton.tsx";
import {useTelegram} from "../../../hooks/useTelegram.tsx";
import NEXT_PAGE from '../../../../assets/add-wallet-next-page.svg'
import React, {useEffect} from "react";
import LinkToSupport from "../../link-to-support/linkToSupport.tsx";

interface WalletButtonProps {
    path: string;
    icon: string;
    title: string;
    message: string;
}

const AddWallet: React.FC  = () => {

    const { tg } = useTelegram();
    const navigate = useNavigate();

    useEffect(()=>{
        tg.MainButton.hide()
    }, [tg])


    const goNext = (nav: string) => {
        navigate(nav)
    }

    return (
        <div>
            <h1>Add a Wallet</h1>
            {WalletButtons.map((buttonProps: WalletButtonProps, index: number) => (
                <div key={index} onClick={() => goNext(buttonProps.path)}>
                    <img src={buttonProps.icon} alt={buttonProps.title} />
                    <h2>{buttonProps.title}</h2>
                    <p>{buttonProps.message}</p>
                    <img src={NEXT_PAGE} alt={'go'}/>
                </div>
            ))}
            <LinkToSupport/>
            <BackButton/>
        </div>
    );
};

export default AddWallet;