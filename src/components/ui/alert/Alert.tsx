import React from "react";
import './Alert.css'
interface AlertProps {
    text: string,
    isVisible: boolean
}

const Alert: React.FC<AlertProps> = ({text, isVisible}) => {
    return (
        isVisible &&
        <div className='alert'>
            {text}
        </div>
    );
};

export default Alert;