import { DependencyList, useCallback } from "react"

export const useClosure = <T, R>(func: (...args: T[]) => R | void, dependencys: DependencyList = []): (...args: T[]) => CallableFunction => {
  return (...args: T[]) => {
    const result = useCallback(() => {
      func(...args)
    }, dependencys)
    return result
  }
}