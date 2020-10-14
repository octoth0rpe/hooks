import { useEffect } from 'react';

export default (callback, dependencies = []) => {
  useEffect(() => {
    const handler = e => e.keyCode === 27 && callback(e);
    window.document.addEventListener('keydown', handler);
    return () => {
      window.document.removeEventListener('keydown', handler);
    };
  }, dependencies);
};