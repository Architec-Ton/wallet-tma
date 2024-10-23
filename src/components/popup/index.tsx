import React, { memo, useEffect, useMemo, useState } from "react";

import { initPopup, isTMA } from "@tma.js/sdk-react";
import { selectPopupState } from "features/tma/popupSelector";
import { resetPopupState } from "features/tma/popupSlice";
import { selectIsTma, selectIsTmaLoading } from "features/tma/tmaSelector";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { PopupEventListenerType, TmaPopupStateContext } from "hooks/useTmaPopup";

import { PopupOnCloseDataType } from "components/layout/PopupProvider";

const PopupTMA = ({ config }: { config: PopupOnCloseDataType }) => {
  const popup = initPopup();
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectPopupState);

  useEffect(() => {
    if (state.isVisible && state.initData) {
      const { listener } = config;
      popup
        .open(state.initData)
        .then(listener)
        .finally(() => {
          dispatch(resetPopupState());
        });
    }
  }, [state, config]);

  return null;
};

const Popup = ({ config }: { config: PopupOnCloseDataType }) => {
  const isTma = useAppSelector(selectIsTma);

  if (isTma) return <PopupTMA config={config} />;

  return null;
};

export default Popup;
