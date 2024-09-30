import { useMemo } from "react";

export const useClosure = <T, R>(func: (...args: T[]) => R | void) => {
  const closure = useMemo(
    () =>
      (...args: T[]) => {
        const result = () => func(...args);
        return result;
      },
    [func],
  );
  return closure;
};
