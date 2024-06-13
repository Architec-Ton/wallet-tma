import './CopyButton.styles.css'
import COPY_ICON from '../../assets/icons/pages/secret-key/copy.svg'
import useLanguage from "../../hooks/useLanguage.ts";

type Props = {
    key_to_wallet: string[];
};

const CopyButton = ({key_to_wallet}: Props) => {

        const t = useLanguage('Copy');
        const copyToClipboard = () => {
        const textToCopy = key_to_wallet.map((word, index) => `${index + 1}. ${word}`).join('');
        navigator.clipboard.writeText(textToCopy)
            //toDO алерт для тг .then(() => alert('Words copied to clipboard'))
            .catch(err => console.error('Failed to copy text: ', err));
    };


    return (
        <div className="copy-button-container">
            <button className="copy-button" onClick={copyToClipboard}>
                <img src={COPY_ICON} alt="Copy Icon" className="copy-icon" />
                <span>{t('Copy')}</span>
            </button>
        </div>
    );
};

export default CopyButton;