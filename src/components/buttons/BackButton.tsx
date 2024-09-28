import React, { useCallback, useEffect } from "react";

import { useBackButton } from "@tma.js/sdk-react";
import { selectBackButtonIsAppWasReloaded } from "features/tma/backButtonSelector";
import { setIsAppWasReloaded } from "features/tma/backButtonSlice";
import { selectIsTma, selectIsTmaLoading } from "features/tma/tmaSelector";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import useRouter from "hooks/useRouter";

interface BackButtonProps {
  visible: boolean;
}

function BackButtonTMA({ visible }: BackButtonProps) {
  const bb = useBackButton();
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const isAppWasReloaded = useAppSelector(selectBackButtonIsAppWasReloaded);

  const handleBackClick = useCallback(() => {
    if (isAppWasReloaded) {
      dispatch(setIsAppWasReloaded(false));
      navigate("/");
    } else {
      navigate(-1);
    }
  }, [dispatch, navigate, isAppWasReloaded]);

  useEffect(() => {
    if (visible) {
      bb.on("click", handleBackClick);
      bb.show();
    } else {
      bb.hide();
    }

    return () => {
      bb.off("click", handleBackClick);
    };
  }, [handleBackClick, bb, visible]);

  return null;
}

function BackButton({ visible }: BackButtonProps) {
  const isTma = useAppSelector(selectIsTma);

  const isTmaLoading = useAppSelector(selectIsTmaLoading);

  if (isTmaLoading) return null;

  if (isTma) return <BackButtonTMA visible={visible} />;

  return <>{visible && <></>}</>;
}

export default BackButton;
