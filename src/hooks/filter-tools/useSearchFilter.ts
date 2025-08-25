// 'use client';

// import * as React from 'react';
// import { useRouter } from 'next/navigation';

// interface IUseSearchFilterArgs {
//   searchRouter: ReturnType<typeof useRouter>;
//   searchParams: URLSearchParams;
//   defaultSearchKey?: string;
//   columnsToSearch: string[];
// }

// export default function useSearchFilter(args: IUseSearchFilterArgs) {
//   const columnsSearchKey =
//     (args.defaultSearchKey ?? 'search') + (args.columnsToSearch.length > 0 ? `_${args.columnsToSearch.join('_')}` : '');

//   const [searchFilterValue, setSearchFilterValue] = React.useState<string>(
//     () => args.searchParams.get(columnsSearchKey) || ''
//   );

//   const debouncedSearchRef = React.useRef<NodeJS.Timeout | null>(null);
//   const handleSearchFilterChange = (value: string) => {
//     setSearchFilterValue(value);

//     if (debouncedSearchRef.current) {
//       clearTimeout(debouncedSearchRef.current);
//     }
//     debouncedSearchRef.current = setTimeout(() => {
//       const params = new URLSearchParams(args.searchParams.toString());
//       if (value === '') {
//         params.delete(columnsSearchKey);
//       } else {
//         params.set(columnsSearchKey, value);
//       }
//       args.searchRouter.replace(`?${params.toString()}`);
//     }, 800);
//   };
//   React.useEffect(() => {
//     return () => {
//       if (debouncedSearchRef.current) {
//         clearTimeout(debouncedSearchRef.current);
//       }
//     };
//   }, []);
//   return {
//     columnsSearchKey,
//     columnsToSearch: args.columnsToSearch,
//     searchFilterValue,
//     setSearchFilterValue,
//     handleSearchFilterChange,
//   };
// }

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

interface IUseSearchFilterArgs {
  searchRouter: ReturnType<typeof useRouter>;
  searchParams: URLSearchParams;
  defaultSearchKey?: string;
  columnsToSearch: string[];
}

export default function useSearchFilter(args: IUseSearchFilterArgs) {
  const columnsSearchKey =
    (args.defaultSearchKey ?? "search") +
    (args.columnsToSearch.length > 0
      ? `_${args.columnsToSearch.join("_")}`
      : "");

  const [searchFilterValue, setSearchFilterValue] = React.useState<string>(
    () => args.searchParams.get(columnsSearchKey) || ""
  );
  const [isSearching, setIsSearching] = React.useState(false);

  const debouncedSearchRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleSearchFilterChange = (value: string) => {
    setSearchFilterValue(value);
    setIsSearching(true);

    if (debouncedSearchRef.current) {
      clearTimeout(debouncedSearchRef.current);
    }

    debouncedSearchRef.current = setTimeout(() => {
      const params = new URLSearchParams(args.searchParams.toString());
      if (value === "") {
        params.delete(columnsSearchKey);
      } else {
        params.set(columnsSearchKey, value);
      }
      params.set("page", "1"); // reset pagination

      args.searchRouter.replace(`?${params.toString()}`, { scroll: false });
      setIsSearching(false);
    }, 800);
  };

  React.useEffect(() => {
    return () => {
      if (debouncedSearchRef.current) {
        clearTimeout(debouncedSearchRef.current);
      }
    };
  }, []);

  return {
    columnsSearchKey,
    columnsToSearch: args.columnsToSearch,
    searchFilterValue,
    setSearchFilterValue,
    handleSearchFilterChange,
    isSearching,
  };
}
