import React, { memo, useEffect } from "react";

import { useCloudStorage, useInitData, useMainButton, useViewport } from "@tma.js/sdk-react";
import { Address } from "@ton/core";
import { selectIsTma, selectIsTmaLoading } from "features/tma/tmaSelector";
import { setReferral } from "features/tma/tmaSlice";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import type { EventHandler } from "hooks/useTma";

interface MainButtonProps {
  title?: string;
  onClick?: EventHandler;
  visible: boolean;
}

const MainButtonTMA = memo(({ title, onClick, visible }: MainButtonProps) => {
  const mb = useMainButton();
  const tma = useViewport();
  const storage = useCloudStorage();
  const dispatch = useAppDispatch();
  const initData = useInitData();

  useEffect(() => {
    mb.setBgColor("#07ACFF");
    mb.setTextColor("#FFFFFF");
  }, [mb]);

  useEffect(() => {
    if (onClick !== undefined) {
      const rmfn = mb.on("click", onClick);

      return () => rmfn();
    }

    return undefined;
  }, [onClick, mb]);

  useEffect(() => {
    if (visible && title) {
      mb.setText(title);
      mb.hideLoader();
      mb.enable();
      mb.show();
    } else {
      mb.hide();
    }
  }, [mb, title, visible]);

  // TODO: Вынести из MainButton эту логику
  useEffect(() => {
    const initTma = async () => {
      if (initData && storage) {
        let ref = initData.startParam;
        if (!ref) {
          ref = await storage.get("ref");
        } else {
          await storage.set("ref", ref);
        }
        if (ref) {
          try {
            Address.parse(ref);
            dispatch(setReferral(ref));
          } catch (e) {
            console.error("Refferal wrong", e);
          }
        }
      }
    };

    tma?.expand();
    initTma();
  }, [storage, dispatch, tma, initData]);

  return null;
});

const MainButton = memo(({ title, onClick, visible }: MainButtonProps) => {
  const isTma = useAppSelector(selectIsTma);
  const isTmaLoading = useAppSelector(selectIsTmaLoading);

  if (isTmaLoading) return null;

  if (isTma) return <MainButtonTMA title={title} onClick={onClick} visible={visible} />;

  return (
    visible && (
      <>
        <div
          style={{
            height: "5rem",
          }}
        />

        <div className="mainbutton-container">
          <button onClick={onClick} className="primary-btn">
            {title}
          </button>
        </div>
      </>
    )
  );
});

export default MainButton;
