import { useEffect, useRef } from 'react';

// Repeatedly calls `callback` every `intervalMs` while the component is mounted.
// Also refreshes immediately when the browser tab regains focus/visibility,
// so admins see new data right away instead of waiting for the next tick.
export function usePolling(callback, intervalMs) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!intervalMs) return undefined;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, intervalMs);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') tick();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [intervalMs]);
}
