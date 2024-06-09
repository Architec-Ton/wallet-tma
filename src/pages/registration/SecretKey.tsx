import Page from "../../components/containers/Page.tsx";
import Title from "../../components/typography/Title.tsx";
import useLanguage from "../../hooks/useLanguage.ts";
import Column from "../../components/containers/Column.tsx";
import CopyButton from "../../components/buttons/CopyButton.tsx";
import {useEffect} from "react";
import key_to_wallet from '../../components/secret-words/Secret24Words.tsx'
import './SecretKey.styles.css';
import Block from "../../components/typography/Block.tsx";
import INFO_CIRCLE from '../../assets/icons/pages/secret-key/info-circle.svg'



const SecretKey = () => {

    const t = useLanguage('Key');

    useEffect(()=>{
            localStorage.setItem('secretWords', JSON.stringify(key_to_wallet));
        }, [])

    const half = Math.ceil(key_to_wallet.length / 2);

    return (
        <Page title={<Title title={t('your-secret-key')} icon={INFO_CIRCLE}/>} >
            <Column>
                <Block>
                    <div className="flex-container">
                        <div className="secret-words-column">
                            {key_to_wallet.slice(0, half).map((word, index) => (
                                <div key={index} className="secret-words-item">
                                    <h2 className="number">{index + 1}. </h2>
                                    <h2 className="secret-words-word">{word}</h2>
                                </div>
                            ))}
                        </div>

                        <div className="secret-words-column">
                            {key_to_wallet.slice(half).map((word, index) => (
                                <div key={index + half} className="secret-words-item">
                                    <h2 className="number">{index + 1 + half}. </h2>
                                    <h2 className="secret-words-word">{word}</h2>
                                </div>
                            ))}
                        </div>

                    </div>
                </Block>
                <CopyButton key_to_wallet={key_to_wallet}/>
            </Column>
        </Page>
    );
};

export default SecretKey;
