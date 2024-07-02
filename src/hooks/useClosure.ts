export const useClosure = <T, R>(func: (...args: T[]) => R | void) => {
  return (...args: T[]) => {
    const result = () => {
      func(...args)
    }
    return result
  }
}