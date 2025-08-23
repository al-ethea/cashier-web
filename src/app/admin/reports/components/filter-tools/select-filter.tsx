import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ISelectFilterProps {
  placeholder: string
  optionGroupLabel: string
  options: {
    value: string
    label: string
  }[]
  columnId: string
  onFilterChange?: (columnId: string, value: string) => void
}

export function SelectFilter(props:ISelectFilterProps) {
  return (
    <Select onValueChange={(value) => props.onFilterChange?.(props.columnId, value)}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{props.optionGroupLabel}</SelectLabel>
          {props.options.map((option,index) => (
            <SelectItem
              key={index}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
