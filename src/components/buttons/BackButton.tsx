import { useBackButton } from "@tma.js/sdk-react";

import { useAppSelector } from "../../hooks/useAppDispatch";
import {
  selectIsTma,
  selectIsTmaLoading,
} from "../../features/tma/tmaSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  visible: boolean;
};

function BackButtonTMA({ visible }: Props) {
  const bb = useBackButton();
  const navigate = useNavigate();
  useEffect(() => {
    if (visible) {
      bb.on("click", () => {
        navigate(-1);
      });
      bb.show();
    } else {
      bb.hide();
    }
  });
  return <></>;
}

function BackButton({ visible }: Props) {
  const isTma = useAppSelector(selectIsTma);
  const isTmaLoading = useAppSelector(selectIsTmaLoading);
  if (isTmaLoading) return <></>;
  if (isTma) return <BackButtonTMA visible={visible} />;
  return (
    <>
      {visible && (
        <>
          <div>BACK</div>
        </>
      )}
    </>
  );
}

export default BackButton;
