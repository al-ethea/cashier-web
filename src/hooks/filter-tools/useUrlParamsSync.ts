'use client';
import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface IUseUrlParamsSyncArgs {
  searchRouter: ReturnType<typeof useRouter>;
  searchParams: URLSearchParams;
  columnsToSearch: string[];
  tabKey: string;
  defaultTabValue: string;
  activeTab: string;
  localStorageTabFilterKey: string;
  pageNumberKey: string;
  pageSizeKey: string;
  defaultFirstPageSize?: string;
  columnsSearchKey: string;
  initialDateKey: string;
  setSearchFilterValue: React.Dispatch<React.SetStateAction<string>>;
  setColumnFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setDateFilterValue: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  debouncedSave: (params: string) => void;
}

export default function useUrlParamsSync(args: IUseUrlParamsSyncArgs) {
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Fix the existing effect to sync on same tab too:
  React.useEffect(() => {
    if (isInitialized) return;

    const urlTab = args.searchParams.get(args.tabKey);
    const currentPage = args.searchParams.get(args.pageNumberKey);
    const currentLimit = args.searchParams.get(args.pageSizeKey);
    if (!urlTab) {
      const params = new URLSearchParams();
      params.set(args.tabKey, args.defaultTabValue);
      params.set(args.pageNumberKey, '1'); // Add default page
      params.set(args.pageSizeKey, args.defaultFirstPageSize ?? '10');
      args.searchRouter.replace(`?${params.toString()}`);
      return;
    }

    // Add default pagination if missing for any tab
    if (!currentPage || !currentLimit) {
      const params = new URLSearchParams(args.searchParams.toString());
      if (!currentPage) params.set(args.pageNumberKey, '1');
      if (!currentLimit) params.set(args.pageSizeKey, args.defaultFirstPageSize ?? '10');
      args.searchRouter.replace(`?${params.toString()}`);
      return;
    }

    // Always sync all filter value, not just on tab change
    args.setSearchFilterValue(args.searchParams.get(args.columnsSearchKey) || '');

    args.setColumnFilters(() => {
      const columnFilters: Record<string, string> = {};
      for (const [key, value] of args.searchParams) {
        if (
          key !== args.tabKey &&
          key !== args.pageNumberKey &&
          key !== args.pageSizeKey &&
          key !== args.columnsSearchKey &&
          key !== args.initialDateKey
        ) {
          columnFilters[key] = value;
        }
      }
      return columnFilters;
    });

    args.setDateFilterValue(() => {
      const dateParam = args.searchParams.get(args.initialDateKey);
      return dateParam ? new Date(dateParam) : undefined;
    });

    // Add pagination sync
    const urlPage = args.searchParams.get(args.pageNumberKey);
    const urlLimit = args.searchParams.get(args.pageSizeKey);

    if (urlPage) {
      const pageNum = parseInt(urlPage, 10);
      if (!isNaN(pageNum) && pageNum > 0) args.setPageNumber(pageNum);
    }
    if (urlLimit) {
      const limitNum = parseInt(urlLimit, 10);
      if (!isNaN(limitNum) && limitNum > 0) args.setPageSize(limitNum);
    }

    // Only restore from localStorage when tab actually changes
    if (urlTab !== args.activeTab) {
      args.setActiveTab(urlTab);
    }
    setIsInitialized(true);
  }, []);

  // Save current tab's search params whenever they change
  React.useEffect(() => {
    if (!isInitialized) return;

    const paramsWithoutTab = new URLSearchParams(args.searchParams.toString());
    paramsWithoutTab.delete(args.tabKey); // Don't save the tab itself

    args.debouncedSave(paramsWithoutTab.toString());
  }, [args.searchParams, args.debouncedSave]);
}
