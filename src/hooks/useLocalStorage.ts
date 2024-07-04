import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const getItem = (): T => {
    const savedItem = localStorage.getItem(key);
    try {
      return savedItem ? JSON.parse(savedItem) : initialValue;
    } catch (e) {
      console.error(`Error parsing JSON from localStorage for key "${key}"`);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getItem);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
