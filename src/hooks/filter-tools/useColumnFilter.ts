'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UseColumnFiltersArgs {
  searchRouter: ReturnType<typeof useRouter>;
  searchParams: URLSearchParams;
  excludedKeys: string[];
}

export default function useColumnFilters(args: UseColumnFiltersArgs) {
  const [columnFilters, setColumnFilters] = React.useState<Record<string, string>>(() => {
    const filters: Record<string, string> = {};
    for (const [key, value] of args.searchParams) {
      if (!args.excludedKeys.some((excludeKey) => key.startsWith(excludeKey))) {
        filters[key] = value;
      }
    }
    return filters;
  });

  const debouncedFilterRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleColumnFilterChange = (columnId: string, value: string) => {
    // Sanitize inputs
    const cleanColumnId = columnId.replace(/[^a-zA-Z0-9_-]/g, '');
    const cleanValue = value.replace(/[<>'"&]/g, '');

    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [cleanColumnId]: cleanValue === 'all' ? '' : cleanValue,
    }));

    if (debouncedFilterRef.current) {
      clearTimeout(debouncedFilterRef.current);
    }

    debouncedFilterRef.current = setTimeout(() => {
      const params = new URLSearchParams(args.searchParams.toString());
      if (cleanValue === 'all' || cleanValue === '') {
        params.delete(cleanColumnId);
      } else {
        params.set(cleanColumnId, cleanValue);
      }
      args.searchRouter.replace(`?${params.toString()}`);
    }, 100);
  };
  React.useEffect(() => {
    return () => {
      if (debouncedFilterRef.current) {
        clearTimeout(debouncedFilterRef.current);
      }
    };
  }, []);

  return {
    columnFilters,
    setColumnFilters,
    handleColumnFilterChange,
  };
}
