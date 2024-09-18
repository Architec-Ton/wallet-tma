import React, {useEffect, useRef, useState} from 'react';
import './Selector.style.css';
import Block from "components/typography/Block.tsx";
import {iconButtonTwoArrows} from '../../assets/icons/buttons';

const Selector = ({ options }) => {
    const [selectedValue, setSelectedValue] = useState<string>(options[0].value);
    const [open, setOpen] = useState<boolean>(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event) => {
        if (selectorRef.current && !selectorRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (option) => {
        setSelectedValue(option);
        setOpen(false);
    };

    return (
        <Block
            className={`custom-select ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
        >
            <div ref={selectorRef}>
                <div className="custom-select-trigger">
                    <div className={'selected-option'}>
                        {selectedValue}
                    </div>
                    <button className={`arrow ${open ? 'open' : ''}`}>
                        <img src={iconButtonTwoArrows} alt=""/>
                    </button>
                </div>
                <div className="custom-options-container">
                    <div className="custom-options">
                        {options
                            .filter(option => option.value !== selectedValue)
                            .map(option => (
                                <div
                                    key={option.value}
                                    className="custom-option"
                                    onClick={() => handleChange(option.value)}
                                >
                                    {option.value}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </Block>
    );
};

export default Selector;

