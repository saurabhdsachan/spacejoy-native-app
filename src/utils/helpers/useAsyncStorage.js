import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [error, setError] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((value) => {
        return value == null ? initialValue : JSON.parse(value);
      })
      .then((returnValue) => {
        setStoredValue(returnValue);
      })
      .catch((e) => {
        setError(e);
      });
  }, [key, initialValue]);

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    AsyncStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue, error];
};

export default useAsyncStorage;
