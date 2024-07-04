import { MouseEventHandler } from 'react';
import './FooterButton.styles.css';

type Props = {
    title: string;
    disabled?: boolean;
    onClick?: MouseEventHandler;
};

function FooterButton({ title, onClick, disabled }: Props) {
    return (
        <div
            style={{
                width: '100%',
            }}>
            <button onClick={onClick} className="footerbutton-mint" disabled={disabled}>
                {title}
            </button>
        </div>
    );
}

export default FooterButton;