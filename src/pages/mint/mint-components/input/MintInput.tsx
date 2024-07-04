import { ChangeEventHandler } from 'react';
// import assets from '../../assets';
import './MintInput.styles.css';
import classNames from 'classnames';

import useLanguage from "../../../../hooks/useLanguage.ts";

type Props = {
    icon: string;
    receive: boolean;
    balance: number;
    title: string;
    value: number;
    selected: boolean;
    onChange?: ChangeEventHandler<HTMLElement>;
};

function MintInput({
                       icon,
                       title,
                       receive,
                       selected,
                       balance,
                       value,
                       onChange,
                   }: Props) {
    const  t  = useLanguage('mint');
    return (
        <div
            className={classNames({
                mintinputmint: true,
                selectedmint: selected,
            })}
            onClick={() => {
                console.log(selected);
                //onClick && onClick(!selected);
            }}>
            <div className="mintinput-header-mint">
                <div><p>{receive ? t('receive') : t('send')}</p></div>
                <div>
                    <p>{t('balance')}:{' '}
                    {balance.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                    })}</p>
                </div>
            </div>
            <div className="mintinput-body-mint">
                <div className="mintinput-title-mint">
                    <img src={icon} />
                    <div>
                        <h3>{title}</h3>
                    </div>
                </div>
                <input
                    className="mintinput-input-mint"
                    onChange={onChange}
                    value={value}
                    type="number"
                />
            </div>
        </div>
    );
}

MintInput.defaultProps = {
    receive: true,
    balance: 0,
    title: 'Bank',
};

export default MintInput;
