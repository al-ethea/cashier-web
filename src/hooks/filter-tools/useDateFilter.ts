'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

export default function useDateFilter({
  initialDateKey,
  searchRouter,
  searchParams,
}: {
  initialDateKey: string;
  searchRouter: ReturnType<typeof useRouter>;
  searchParams: URLSearchParams;
}) {
  const [dateFilterValue, setDateFilterValue] = React.useState<Date | undefined>(() => {
    const dateParam = searchParams.get(initialDateKey);
    if (dateParam) {
      // Parse as local date to avoid timezone issues
      const [year, month, day] = dateParam.split('-').map(Number);
      return new Date(year, month - 1, day); // month is 0-indexed
    }
    return undefined;
  });
  const handleDateFilterChange = (value: Date | undefined) => {
    setDateFilterValue(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      // Format as local date string to avoid timezone conversion
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const day = String(value.getDate()).padStart(2, '0');
      params.set(initialDateKey, `${year}-${month}-${day}`);
    } else {
      params.delete(initialDateKey);
    }
    searchRouter.replace(`?${params.toString()}`);
  };
  return {
    initialDateKey,
    dateFilterValue,
    setDateFilterValue,
    handleDateFilterChange,
  };
}
