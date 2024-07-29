import { useRef, useCallback } from 'react';

type Debounce = (callback: () => void, delay: number) => void;

function useDebounce(): Debounce {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce: Debounce = useCallback((callback, delay) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, []);

  return debounce;
}

export default useDebounce;
