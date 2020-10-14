import { useState } from 'react';

export default (initialState) => {
  const [state, setState] = useState(initialState);
  const trim = (callback) => {
    const trimmedState = { ...state };
    Object.keys(trimmedState).forEach((key) => {
      if (typeof trimmedState[key] === 'string') {
        trimmedState[key] = trimmedState[key].trim();
      }
    });
    setState(trimmedState);
    callback(trimmedState);
  };
  return [
    state,
    (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setState(oldState => ({ ...oldState, [name]: value }));
    },
    trim,
  ];
};