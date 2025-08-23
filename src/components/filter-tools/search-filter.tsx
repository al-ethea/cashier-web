import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';

interface ISearchFilterProps<TData> {
  table: Table<TData>;
  searchableColumns?: string[]; // For multi-column filtering
  placeholder?: string;
  searchValue?: string;
  filteringType?: 'frontend' | 'backend';
  onSearchFilterChange?: (value: string) => void;
  className?: string;
}

export default function SearchFilter<TData>(props: ISearchFilterProps<TData>) {
  const handleFilterChange = (value: string) => {
    if (props.onSearchFilterChange) {
      props.onSearchFilterChange(value);
    }

    if (props.filteringType === 'frontend' && props.searchableColumns) {
      props.table.setGlobalFilter(value);
    }
  };

  return (
    <Input
      placeholder={props.placeholder ?? 'Search...'}
      value={
        props.filteringType === 'frontend' && props.searchableColumns
          ? props.table.getState().globalFilter ?? ''
          : props.searchValue??''
      }
      onChange={(event) => handleFilterChange(event.target.value)}
      className={props.className ?? 'max-w-xs'}
    />
  );
}
