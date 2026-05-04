import { useEffect, useCallback } from 'react';

/**
 * Calls `callback` whenever the Escape key is pressed.
 * Safe to use in any overlay/modal component.
 */
export function useEscapeKey(callback: () => void) {
  const cb = useCallback(callback, [callback]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cb();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [cb]);
}
