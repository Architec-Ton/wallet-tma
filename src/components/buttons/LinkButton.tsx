import { useUtils } from '@tma.js/sdk-react';
import classNames from 'classnames';
import { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import {
  selectIsTma,
  selectIsTmaLoading,
} from '../../features/tma/tmaSelector';
import { useAppSelector } from '../../hooks/useAppDispatch';

type Props = {
  title?: string;
  to: string;
  children?: React.ReactNode;
  visible?: boolean;
  style?: CSSProperties;
  className?: string;
};

function LinkButtonTMA({ to, children, style, className, visible }: Props) {
  const utils = useUtils();
  return (
    <>
      {visible && (
        <button
          onClick={() => {
            utils.openTelegramLink(to);
          }}
          style={style}
          className={classNames(className, 'primary-btn')}>
          {children}
        </button>
      )}
    </>
  );
}

function LinkButton({ children, to, style, className, visible = true }: Props) {
  const isTma = useAppSelector(selectIsTma);
  const isTmaLoading = useAppSelector(selectIsTmaLoading);

  if (isTmaLoading) return <></>;
  if (isTma)
    return (
      <LinkButtonTMA to={to} visible={visible}>
        {children}
      </LinkButtonTMA>
    );
  return (
    <>
      {visible && (
        <>
          <NavLink to={to} style={style} className={className}>
            {children}
          </NavLink>
          {/* onClick={(e) => handlerOnClick(e)}
            style={style}
            className="primary-btn">
            {children}
          </button> */}
        </>
      )}
    </>
  );
}

export default LinkButton;
