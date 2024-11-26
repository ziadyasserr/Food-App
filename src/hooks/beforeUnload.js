import React, { useEffect } from 'react'

export default function beforeUnload() {
    useEffect(() => {
        let beforeUnloadHandler = (e) => {
          e.preventDefault();
        };
        window.addEventListener('beforeunload', beforeUnloadHandler);
        return () =>
          window.removeEventListener('beforeunload', beforeUnloadHandler);
      }, []);
}
