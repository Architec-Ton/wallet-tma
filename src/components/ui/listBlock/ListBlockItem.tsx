import React from "react";

import cn from "classnames";

import Column from "../../containers/Column";
import ListBaseItem from "./ListBaseItem";

type OwnPropsType = {
  thumb?: string;
  title?: string;
  description?: string;
  iconAction?: string;
  onClick?: CallableFunction;
  isPartner?: boolean;
};

const ListBlockItem = ({ thumb, title, description, iconAction, onClick, isPartner }: OwnPropsType) => (
  <ListBaseItem onClick={onClick}>
    {thumb && <GameIcon thumb={thumb} framed={!!isPartner} />}
    <Column className="list-block__info">
      {title && <div className="list-block__title">{title}</div>}
      {description && <div className="list-block__description">{description}</div>}
    </Column>
    {iconAction && <img src={iconAction} alt="" className="list-block__button" />}
  </ListBaseItem>
);

const GameIcon = ({ thumb, framed }: { thumb: string; framed: boolean }) => (
  <div className="list-block__icon-wrapper">
    <img src={thumb} alt="" className={cn({ "list-block__icon": true, "list-block__icon--framed": framed })} />

    {framed && (
      <div className="list-block__icon--framed-logo">
        <LogoSVG />
      </div>
    )}

    {framed && <div className="list-block__icon--framed-gradient" />}
  </div>
);

export const LogoSVG = () => (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M60.517 23.1045L37.7935 46.4483C37.318 46.9367 37.324 47.7167 37.8068 48.1978L48.0349 58.3898C48.4375 58.791 49.0609 58.8684 49.5494 58.5778L62.0448 51.145C62.422 50.9206 62.6531 50.5143 62.6531 50.0755L62.6531 23.9725C62.6531 22.8558 61.2959 22.3043 60.517 23.1045Z"
      fill="white"
    />
    <path
      d="M38.0907 46.7377L60.8142 23.3939C61.3335 22.8604 62.2383 23.2281 62.2383 23.9725L62.2383 50.0755C62.2383 50.368 62.0842 50.6389 61.8328 50.7885L49.3373 58.2213C49.0117 58.415 48.5961 58.3634 48.3277 58.0959L38.0996 47.904C37.7777 47.5832 37.7737 47.0633 38.0907 46.7377Z"
      stroke="white"
      strokeWidth="0.829598"
    />
    <path
      d="M5.00195 50.1733L5.00195 23.9217C5.00195 22.8121 6.34448 22.2573 7.12779 23.0433L44.0922 60.1352C44.6699 60.7149 44.5403 61.6849 43.8306 62.0926L34.5517 67.4233C34.165 67.6454 33.6891 67.6437 33.3041 67.4188L5.61872 51.2479C5.23677 51.0248 5.00195 50.6157 5.00195 50.1733Z"
      fill="white"
    />
    <path
      d="M5.41675 50.1733L5.41675 23.9217C5.41675 23.1819 6.31177 22.8121 6.83398 23.3361L43.7984 60.428C44.1835 60.8145 44.0971 61.4611 43.624 61.733L34.345 67.0637C34.0873 67.2117 33.77 67.2106 33.5134 67.0607L5.82793 50.8897C5.5733 50.741 5.41675 50.4682 5.41675 50.1733Z"
      stroke="white"
      strokeWidth="0.829598"
    />
    <path
      d="M33.6162 1.36723L8.05186 16.3142C7.34806 16.7257 7.22348 17.6915 7.79981 18.2681L33.1972 43.6788C33.6811 44.1629 34.4651 44.1653 34.952 43.6842L60.6742 18.2683C61.2564 17.693 61.1342 16.722 60.4277 16.3089L34.8724 1.36723C34.4844 1.14038 34.0042 1.14038 33.6162 1.36723Z"
      fill="white"
    />
    <path
      d="M8.26123 16.6723L33.8255 1.72532C34.0842 1.57408 34.4043 1.57408 34.663 1.72532L34.8715 1.36871L34.663 1.72532L60.2183 16.667C60.6893 16.9424 60.7708 17.5897 60.3826 17.9733L34.6604 43.3892C34.3359 43.7099 33.8132 43.7083 33.4906 43.3855L8.09319 17.9749C7.70897 17.5905 7.79203 16.9466 8.26123 16.6723Z"
      stroke="white"
      strokeWidth="0.829598"
    />
  </svg>
);

export default ListBlockItem;
