'use client';
import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { time } from 'console';

interface IUseTabManagementArgs {
  searchRouter: ReturnType<typeof useRouter>;
  searchParams: URLSearchParams;
  localStorageTabFilterKey?: string;
  customTabKey?: string;
  customTabValue?: string;
}

export default function useTabUrlParamsManagement(args: IUseTabManagementArgs) {
  const defaultTabValue = args.customTabValue ?? '';
  const tabKey = args.customTabKey ?? 'tab';
  const localStorageTabFilterKey = args.localStorageTabFilterKey ?? `filters`;

  // Initialize activeTab from URL immediately
  const [activeTab, setActiveTab] = React.useState<string>(() => {
    return args.searchParams.get(tabKey) || defaultTabValue;
  });

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const debouncedSave = React.useCallback((params: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      localStorage.setItem(localStorageTabFilterKey+'_'+activeTab, params);
    }, 300);
  }, [activeTab, localStorageTabFilterKey]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const savedParams = localStorage.getItem(localStorageTabFilterKey + '_' + tab) || '';
    const params = new URLSearchParams(savedParams);
    params.set(tabKey, tab);

    args.searchRouter.replace(`?${params.toString()}`);
  };
  return {
    tabKey,
    localStorageTabFilterKey,
    activeTab,
    setActiveTab,
    handleTabChange,
    debouncedSave,
  };
}
