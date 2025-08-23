'use client';
import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface IUsePaginationArgs {
  searchRouter: ReturnType<typeof useRouter>;
  searchParams: URLSearchParams;
  defaultPageKey?: string;
  defaultPageSizeKey?: string;
  pageSizeVariants?: number[];
}

export default function usePagination(
  args: IUsePaginationArgs
) {
  const pageNumberKey = args.defaultPageKey ?? 'page';
  const pageSizeKey = args.defaultPageSizeKey ?? 'limit';
  const pageSizeVariants = args.pageSizeVariants ?? [10, 20, 30, 40, 50];

  const [pageNumber, setPageNumber] = React.useState(() => {
    const pageParam = args.searchParams.get(pageNumberKey);
    return pageParam ? parseInt(pageParam) : 1;
  });
  const [pageSize, setPageSize] = React.useState(() => {
    const sizeParam = args.searchParams.get(pageSizeKey);
    return sizeParam ? parseInt(sizeParam) : pageSizeVariants[0];
  });
  const handlePageChange = (pageNum: number) => {
    setPageNumber(pageNum);
    const params = new URLSearchParams(args.searchParams.toString());
    params.set(pageNumberKey, pageNum.toString());
    args.searchRouter.replace(`?${params.toString()}`);
  };
  const handleNewPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    const params = new URLSearchParams(args.searchParams.toString());
    params.set(pageSizeKey, pageSize.toString());
    args.searchRouter.replace(`?${params.toString()}`);
  };

  return {
    pageNumberKey,
    pageSizeKey,
    pageSizeVariants,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    handlePageChange,
    handleNewPageSizeChange,
  };
}
