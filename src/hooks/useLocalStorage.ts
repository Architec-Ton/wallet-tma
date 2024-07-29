import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const getItem = (): T => {
    const savedItem = localStorage.getItem(key);
    return savedItem ? JSON.parse(savedItem) : initialValue;
  };

  const [storedValue, setStoredValue] = useState<T>(getItem());

  useEffect(() => {
    console.log("Update key:", key, storedValue);
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
