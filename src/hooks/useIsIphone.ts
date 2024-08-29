import { useEffect, useState } from "react";

const useIsIphone = (): boolean => {
  const [isIphone, setIsIphone] = useState<boolean>(false);

  useEffect(() => {
    const { userAgent } = window.navigator;
    if (/iPhone/i.test(userAgent)) {
      setIsIphone(true);
    }
  }, []);

  return isIphone;
};

export default useIsIphone;
