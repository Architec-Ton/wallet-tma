import type { CSSProperties } from "react";
import React, { useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useHapticFeedback } from "@tma.js/sdk-react";
import classNames from "classnames";

import useRouter from "hooks/useRouter";

import "./Menu.styles.css";

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
  // const page = usePage();
  const location = useLocation();
  const navigate = useRouter();
  const hapticFeedback = useHapticFeedback();

  const handlerClick = useCallback(
    (to: string, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      if (location.pathname !== to) {
        // page.setLoading(true, false);
        hapticFeedback.impactOccurred("medium");
        navigate(to);
      }
    },
    [location.pathname, navigate, hapticFeedback],
  );

  return (
    <nav className={classNames(className, "menu-nav")} style={style}>
      <div className="menu">
        {menuItems.map((item) => (
          <NavLink to={item.to} key={item.to} onClick={(e) => handlerClick(item.to, e)}>
            {item.icon && <img src={item.icon} alt={item.label} aria-label={item.label} />}
            <p>{item.label}</p>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Menu;
