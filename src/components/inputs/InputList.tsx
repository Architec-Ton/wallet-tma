import React from 'react';
import Input from "./Input.tsx";

interface InputListProps {
    startNumber: number;
    count: number;
    onInputChange?: (index: number, value: string) => void;
}

const InputList: React.FC<InputListProps> = ({ startNumber, count, onInputChange }) => {

    const inputs = Array.from({ length: count }, (_, index) => (
        <Input
            number={startNumber + index}
            key={startNumber + index}
            onInputChange={onInputChange}
            index={startNumber + index - 1}
        />
    ));
    return <div>{inputs}</div>;
};

export default InputList;