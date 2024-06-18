import './Circle.styles.css'
import React from "react";

interface CircleProps {
    pin: string;
    index: number;
    status: string;
}
const Circle: React.FC<CircleProps> = ({pin, index, status}) => {

    const isFilled = index < pin.length;
    const circleClassName = `${status}-animation`;

    const fillColor = status == 'normal'
        ? (isFilled ? 'var(--primary-color)' : 'var(--third-colour)')
        : (status == 'success'
            ? 'var(--success-color)'
            : 'var(--error-color)'
        )

    return (
        <div className="circle-container">
            <svg key={index} width="1.8rem" height="1.8rem" className={circleClassName}>
                <circle
                    cx='0.9rem'
                    cy='0.9rem'
                    r={index < pin.length ? '0.7rem' : '0.45rem'}
                    fill={fillColor}
                />
            </svg>
        </div>
    );
};

export default Circle;