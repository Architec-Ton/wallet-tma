import React, { useEffect } from "react";

import { useBackButton } from "@tma.js/sdk-react";
import { selectIsTma, selectIsTmaLoading } from "features/tma/tmaSelector";

import { useAppSelector } from "hooks/useAppDispatch";
import useRouter from "hooks/useRouter";

interface BackButtonProps {
  visible: boolean;
}

function BackButtonTMA({ visible }: BackButtonProps) {
  const bb = useBackButton();
  const navigate = useRouter();

  useEffect(() => {
    const handleBackClick = () => {
      navigate("/");
    };

    if (visible) {
      bb.on("click", handleBackClick);
      bb.show();
    } else {
      bb.hide();
    }
    return () => {
      bb.off("click", handleBackClick);
    };
  }, [bb, navigate, visible]);

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
