import classNames from "classnames";
import { CSSProperties } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Menu.styles.css";
import { useClosure } from "../../../hooks/useClosure";
import useRouter from "../../../hooks/useRouter";

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

  const handlerClick = useClosure((to: string) => {
    if (location.pathname !== to) {
      //page.setLoading(true, false);
      navigate(to);
    }
  });

  return (
    <nav className={classNames(className, "menu-nav")} style={style}>
      <div className="menu">
        {menuItems.map((item) => (
          <NavLink to={item.to} key={item.to} onClick={handlerClick(item.to)}>
            {item.icon && (
              <img src={item.icon} alt={item.label} aria-label={item.label} />
            )}
            <p>{item.label}</p>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Menu;
