import PASTE_ICON from '../../assets/icons/pages/existing/paste-icon.svg'
import useLanguage from "../../hooks/useLanguage.ts";
import './PasteButton.styles.css'

const PasteButton = () => {

    const t = useLanguage('Paste');

    return (
        <div className="paste-button-container">
            <button className="paste-button" >
                <img src={PASTE_ICON } alt="Copy Icon" className="paste-icon" />
                <span>{t('paste')}</span>
            </button>
        </div>
    );
};

export default PasteButton;