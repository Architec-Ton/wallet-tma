import Block from "../typography/Block.tsx";
import './Input.styles.css'
import React from "react";

interface InputProps {
    number: number;
}

const Input: React.FC<InputProps>  = ({number}) => {
    return (
        <Block style={{margin: '8px'}}>
            <div className='inputContainer'>
                <h2 className='number'>{number}.</h2>
                <input type="text" placeholder="" />
            </div>
        </Block>
    );
};

export default Input;