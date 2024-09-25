import React, { useMemo, useState } from "react";

import { selectIsTma, selectIsTmaLoading } from "features/tma/tmaSelector";

import { useAppSelector } from "hooks/useAppDispatch";
import { PopupEventListenerType, TmaPopupStateContext } from "hooks/useTmaPopup";

import Popup from "components/popup";

export type PopupOnCloseDataType = { event: "popup_closed"; listener: (buttonId: string | null) => void };

const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const isTmaLoading = useAppSelector(selectIsTmaLoading);
  const [popupConfig, setPopupConfig] = useState<PopupOnCloseDataType>({} as PopupOnCloseDataType);

  const popupContextValue = useMemo(
    () => ({ setPopupEventListener: setPopupConfig as PopupEventListenerType }),
    [setPopupConfig],
  );

  if (isTmaLoading) return null;

  return (
    <TmaPopupStateContext.Provider value={popupContextValue}>
      {children}
      <Popup config={popupConfig} />
    </TmaPopupStateContext.Provider>
  );
};

export default PopupProvider;
