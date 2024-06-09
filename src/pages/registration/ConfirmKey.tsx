
import Title from "../../components/typography/Title.tsx";
import Page from "../../components/containers/Page.tsx";
import useLanguage from "../../hooks/useLanguage.ts";
import Column from "../../components/containers/Column.tsx";
import  './ConfirmKey.styles.css'
import Input from "../../components/inputs/Input.tsx";
import React from "react";

const ConfirmKey: React.FC = () => {
    const t = useLanguage('Confirm');

    const numbersOfWords = [1, 2, 3]

    const description = (<p>{t('description')} <span>{numbersOfWords.join(', ')}</span></p>)

    return (
        <Page title={<Title title={t('confirm-the-key')}/>}
              description={description}>
            <Column>
                <div className='container'>
                    {numbersOfWords.map((number, index) => (
                        <Input number={number} key={index}/>
                    ))}
                </div>
            </Column>
        </Page>
    );
};

export default ConfirmKey;