'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ISingleDatePickerProps {
  placeholder?: string;
  width?: number
  disabledFn?: (date: Date) => boolean
  date?: Date
  onSelectDate?: (date: Date|undefined) => void
}

export function SingleDatePicker(props: ISingleDatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date: Date | undefined) => {
    props.onSelectDate?.(date);
    setOpen(false); // Close popover after selection
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          data-empty={!props.date}
          style={{ width: `${props.width ?? 200}px`, maxWidth: `${props.width ?? 200}px` }}
          className={`data-[empty=true]:text-muted-foreground justify-start text-left font-normal`}>
          <CalendarIcon />
          {props.date ? format(props.date, 'PPP') : <span>{props.placeholder ?? 'Pick a date'}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={props.date}
          onSelect={handleSelect}
          disabled={props.disabledFn}
          required={false}
        />
      </PopoverContent>
    </Popover>
  );
}
