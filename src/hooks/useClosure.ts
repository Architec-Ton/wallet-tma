import { useMemo } from "react"

export const useClosure = <T, R>(func: (...args: T[]) => R | void) => {
  const closure = useMemo(() => {
    return (...args: T[]) => {
      const result = () => {
        return func(...args)
      }
      return result
    }
  }, [func])
  return closure
}