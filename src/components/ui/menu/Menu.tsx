import classNames from 'classnames';
import { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.styles.css';
import { usePage } from '../../../hooks/usePage';

export interface MenuItem {
  to: string;
  icon: string;
  label: string;
}

interface MenuProps {
  menuItems: MenuItem[];
  style?: CSSProperties;
  className?: string;
}

function Menu({ menuItems, style, className }: MenuProps) {
  const page = usePage();

  const handlerClick = () => {
    page.setLoading(true, false);
  };

  return (
    <nav className={classNames(className, 'menu')} style={style}>
      {menuItems.map((item) => (
        <NavLink to={item.to} key={item.to} onClick={handlerClick}>
          {item.icon && (
            <img src={item.icon} alt={item.label} aria-label={item.label} />
          )}
          <p>{item.label}</p>
        </NavLink>
      ))}
    </nav>
  );
}

export default Menu;
