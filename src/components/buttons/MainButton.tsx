import {
  useCloudStorage,
  useInitData,
  useMainButton,
  useViewport,
} from "@tma.js/sdk-react";
import { EventHandler } from "../../hooks/useTma";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  selectIsTma,
  selectIsTmaLoading,
} from "../../features/tma/tmaSelector";
import { useEffect, useState } from "react";
import { Address } from "@ton/core";
import { setReferral } from "../../features/tma/tmaSlice";

type Props = {
  title?: string;
  onClick?: EventHandler;
  visible: boolean;
};

function MainButtonTMA({ title, onClick, visible }: Props) {
  const mb = useMainButton();
  const tma = useViewport();
  const storage = useCloudStorage();
  const dispatch = useAppDispatch();
  const initData = useInitData();
  const [rmListener, setRmListener] = useState<() => void>(() => {});

  useEffect(() => {
    if (rmListener) {
      console.log("rm on", rmListener);
      rmListener();
      setRmListener(() => {});
    }
    if (onClick !== undefined) {
      const rmfn = mb.on("click", () => {
        //mb.showLoader();
        console.log("Just click ", onClick);
        onClick();
      });
      console.log("set on", rmfn);
      setRmListener(() => rmfn);
      //tma?.expand();
    }
  }, [onClick]);

  useEffect(() => {
    mb.setBgColor("#07ACFF");
    mb.setTextColor("#FFFFFF");
  }, []);

  useEffect(() => {
    if (visible && title) {
      mb.setText(title);
      mb.hideLoader();
      mb.enable();
      mb.show();
    } else {
      mb.hide();
    }
  }, [title, visible]);

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
            console.log("Refferal wrong", e);
          }
        }
      }
    };

    tma?.expand();
    initTma();
  }, [tma, initData]);
  return <></>;
}

function MainButton({ title, onClick, visible }: Props) {
  const isTma = useAppSelector(selectIsTma);
  const isTmaLoading = useAppSelector(selectIsTmaLoading);

  if (isTmaLoading) return <></>;
  if (isTma)
    return <MainButtonTMA title={title} onClick={onClick} visible={visible} />;
  return (
    <>
      {visible && (
        <>
          <div
            style={{
              height: "5rem",
            }}
          ></div>
          <div className="mainbutton-container">
            <button onClick={onClick} className="primary-btn">
              {title}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default MainButton;
