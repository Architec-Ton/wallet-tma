import React from 'react';
import { NavLink } from 'react-router-dom';


interface NavItem {
    to: string;
    icon: string;
    label: string;
}

interface BottomNavBarProps {
    navItems: NavItem[];
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({navItems}) => {

    return (
        <nav className="bottom-nav-bar">
            {navItems.map((item) => (
                <NavLink to={item.to} key={item.to} >
                    <img src={item.icon} className="icon" alt={item.label} aria-label={item.label} />
                    <p>{item.label}</p>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNavBar;