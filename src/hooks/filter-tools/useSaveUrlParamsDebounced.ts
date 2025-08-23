'use client'
import React from 'react';

export default function useSaveUrlParamsDebounced(
  activeTab: string,
  localStorageTabFilterKey: string
) {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const debouncedSave = React.useCallback((params: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      localStorage.setItem(localStorageTabFilterKey+'_'+activeTab, params);
    }, 300);
  }, [activeTab, localStorageTabFilterKey]);
  return {
    debouncedSave
  }
}
