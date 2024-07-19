import { useBackButton } from "@tma.js/sdk-react";

import { useEffect } from "react";
import {
  selectIsTma,
  selectIsTmaLoading,
} from "../../features/tma/tmaSelector";
import { useAppSelector } from "../../hooks/useAppDispatch";
import useRouter from "../../hooks/useRouter";

type Props = {
  visible: boolean;
};

function BackButtonTMA({ visible }: Props) {
  const bb = useBackButton();
  const navigate = useRouter();
  useEffect(() => {
    if (visible) {
      bb.on("click", () => {
        navigate("/");
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
  return <>{visible && <></>}</>;
}

export default BackButton;
