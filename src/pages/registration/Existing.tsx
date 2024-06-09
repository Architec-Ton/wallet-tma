import Page from "../../components/containers/Page.tsx";
import Title from "../../components/typography/Title.tsx";
import useLanguage from "../../hooks/useLanguage.ts";
import INFO_CIRCLE from "../../assets/icons/pages/secret-key/info-circle.svg";
import Input from "../../components/inputs/Input.tsx";
import React from "react";
import './Existing.styles.css'
import PasteButton from "../../components/buttons/PasteButton.tsx";


interface InputListProps {
    startNumber: number;
    count: number;
}

const Existing: React.FC = () => {
    const t = useLanguage('Existing')

    const InputList: React.FC<InputListProps>  = ({startNumber, count }) => {
        const inputs = Array.from({ length: count }, (_, index) => (
                <Input number={startNumber +index} key={startNumber + index}/>
        ))
        return <div>{inputs}</div>
    }

    return (
        <Page title={<Title title={t('enter-key')} icon={INFO_CIRCLE}/>}>
            <div className='inputListContainer'>
                <InputList startNumber={1} count={12}/>
                <InputList startNumber={13} count={12}/>
            </div>
            <PasteButton/>
        </Page>
    );
};

export default Existing;