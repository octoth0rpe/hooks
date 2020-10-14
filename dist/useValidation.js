import { useState, useEffect } from 'react';
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const minLength = (min = 5, message = 'Must be longer than %min characters') => value => String(value).length < min ? message.replace('%min', min) : true;
export const maxLength = (max = 255, message = 'Must be shorter than %max characters') => value => String(value).length > max ? message.replace('%max', max) : true;
export const lengthRange = (min = 5, max = 255, message = 'Must be between %min and %max characters long') => value => String(value).length < min || String(value).length > max ? message.replace('%min', min).replace('%max', max) : true;
export const email = (message = 'Must be a valid e-mail address') => value => emailRegex.test(value) ? true : message;
export default ((state, rules) => {
  const [errors, setErrors] = useState({});

  const ifValid = stateToCheck => new Promise((resolve, reject) => {
    let hasErrors = false;
    const nextErrors = {};
    Object.keys(rules).forEach(stateKey => {
      let error;

      if (stateKey in rules) {
        error = rules[stateKey](stateToCheck[stateKey]);
      }

      if (error !== true) {
        hasErrors = true;
        nextErrors[stateKey] = error;
      }
    });
    setErrors(nextErrors);

    if (hasErrors === false) {
      resolve(stateToCheck);
    } else {
      reject(nextErrors);
    }
  });

  useEffect(() => {
    let hasChanges = false;
    const nextErrors = { ...errors
    };
    Object.keys(nextErrors).forEach(stateKey => {
      const error = rules[stateKey](state[stateKey]);

      if (error === true) {
        if (stateKey in nextErrors) {
          hasChanges = true;
        }

        delete nextErrors[stateKey];
      }
    });

    if (hasChanges) {
      setErrors(nextErrors);
    }
  }, [state, rules, errors]);
  return [errors, ifValid];
});