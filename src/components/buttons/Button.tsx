import { CSSProperties } from 'react';
import './Button.styles.css';
import classNames from 'classnames';

type Props = {
  icon?: string;
  title?: string;
  primary?: boolean;
  style?: CSSProperties;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
};

function Button({
  icon,
  title,
  style,
  className,
  primary = true,
  onClick,
  children,
  disabled,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(className, {
        button: true,
        primary: primary,
      })}
      style={style}>
      {icon && <img src={icon} alt={title} />}
      {title && <div>{title}</div>}
      {children}
    </button>
  );
}

export default Button;
