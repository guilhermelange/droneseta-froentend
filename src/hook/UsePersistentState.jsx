import {useEffect, useRef, useState} from "react"

export function usePersistentState(name, defaultValue)  {
  const [value, setValue] = useState(defaultValue);
  const nameRef = useRef(name);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(name);
      if (storedValue !== null) setValue(storedValue);
      else localStorage.setItem(name, defaultValue);
    } catch {
      setValue(defaultValue);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(nameRef.current, value);
    } catch {}
  }, [value]);

  useEffect(() => {
    const lastName = nameRef.current;
    if (name !== lastName) {
      try {
        localStorage.setItem(name, value);
        nameRef.current = name;
        localStorage.removeItem(lastName);
      } catch {}
    }
  }, [name]);

  return [value, setValue];
};

export function usePersState(key, initialState) {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      return JSON.parse(storageValue);
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}