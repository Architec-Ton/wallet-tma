import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, (key: string) => void] {
  const getItem = (): T => {
    const savedItem = localStorage.getItem(key);
    return savedItem ? JSON.parse(savedItem) : initialValue;
  };

  const [storedValue, setStoredValue] = useState<T>(getItem());

  useEffect(() => {
    console.log("Update key:", key, storedValue);
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  const removeStoredValue = (key: string) => {
    localStorage.removeItem(key);
  };

  return [storedValue, setStoredValue, removeStoredValue];
}

export default useLocalStorage;
