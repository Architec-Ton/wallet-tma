import { useEffect } from "react";

import { useBackButton } from "@tma.js/sdk-react";
import { selectIsLoading } from "features/page/pageSelectors";

import { useAppSelector } from "hooks/useAppDispatch";
import useRouter from "hooks/useRouter";

export const useBB = (cb?: () => void) => {
  const bb = useBackButton();
  const navigate = useRouter();
  const isLoading = useAppSelector(selectIsLoading);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleBackClick = cb || goBack;

    if (!isLoading) {
      bb.on("click", handleBackClick);
      bb.show();
    } else {
      bb.hide();
    }

    return () => {
      bb.off("click", handleBackClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
};
