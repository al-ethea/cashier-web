'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { on } from 'events';

interface IDataTablePaginationProps<TData> {
  table: Table<TData>;
  filteringType?: 'frontend' | 'backend';
  totalItems?: number;
  currentPageNumber?: number;
  onPageChange: (page: number) => void;
  pageSizeVariants?: number[];
  pageSize?: number;
  onPageSizeChange: (pageSize: number) => void;
}

export function DataTablePagination<TData>(props: IDataTablePaginationProps<TData>) {
  const isBackendPagination = props.filteringType === 'backend';
  const pageSize = isBackendPagination ? props.pageSize! : props.table.getState().pagination.pageSize;
  const pageSizeVariants = props.pageSizeVariants ?? [10, 20, 30, 40, 50];

  const currentPage = isBackendPagination ? props.currentPageNumber! : props.table.getState().pagination.pageIndex+1;

  const totalPages = isBackendPagination
    ? Math.ceil(props.totalItems! / pageSize)
    : props.table.getPageCount();

  return (
    <div className='flex max-md:flex-col items-center justify-between px-2'>
      <div className='text-muted-foreground flex-1 text-sm'>
        {props.table.getFilteredSelectedRowModel().rows.length} of {props.table.getFilteredRowModel().rows.length}{' '}
        row(s) selected.
      </div>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Rows per page</p>
          <Select
            value={`${props.table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              if (isBackendPagination) {
                props.onPageSizeChange(Number(value));
              } else {
                props.table.setPageSize(Number(value));
              }
            }}>
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={props.table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {pageSizeVariants.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {currentPage} of {totalPages}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => {
              isBackendPagination ? props.onPageChange(1) : props.table.setPageIndex(0);
            }}
            disabled={isBackendPagination ? props.currentPageNumber === 1 : !props.table.getCanPreviousPage()}>
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => {
              isBackendPagination ? props.onPageChange(currentPage - 1) : props.table.previousPage();
            }}
            disabled={isBackendPagination ? props.currentPageNumber === 1 : !props.table.getCanPreviousPage()}>
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => {
              isBackendPagination ? props.onPageChange(currentPage + 1) : props.table.nextPage();
            }}
            disabled={isBackendPagination ? props.currentPageNumber! >= totalPages : !props.table.getCanNextPage()}>
            <span className='sr-only'>Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => {
              isBackendPagination
                ? props.onPageChange(totalPages)
                : props.table.setPageIndex(props.table.getPageCount() - 1);
            }}
            disabled={isBackendPagination ? props.currentPageNumber! >= totalPages : !props.table.getCanNextPage()}>
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
