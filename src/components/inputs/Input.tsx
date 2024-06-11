import Block from "../typography/Block.tsx";
import './Input.styles.css'
import React from "react";

interface InputProps {
    number: number;
    index: number;
    onInputChange?: (index: number, value: string) => void;
}

const Input: React.FC<InputProps>  = ({number, onInputChange,  index}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onInputChange) {
            onInputChange(index, event.target.value
            )}
    }

    return (
        <Block style={{margin: '8px'}}>
            <div className='inputContainer'>
                <h2 className='number'>{number}.</h2>
                <input type="text" placeholder="" onChange={handleChange}/>
            </div>
        </Block>
    )
}

export default Input;