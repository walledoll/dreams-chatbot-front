// src/components/DatePicker.tsx
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  return date instanceof Date && !isNaN(date.getTime());
}

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | undefined) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const controlled = value !== undefined && onChange !== undefined;

  // Используем локальное состояние, только если компонент НЕ управляемый
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(() => {
    if (controlled) return value ?? undefined;
    return new Date("2025-06-01");
  });

  const date = controlled ? value ?? undefined : internalDate;
  const [month, setMonth] = React.useState<Date | undefined>(date);

  const handleChange = (newDate: Date | undefined) => {
    if (controlled) {
      onChange?.(newDate);
    } else {
      setInternalDate(newDate);
    }
    setMonth(newDate);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          value={formatDate(date)}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const inputDate = new Date(e.target.value);
            if (isValidDate(inputDate)) {
              handleChange(inputDate);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date ?? undefined}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate) => {
                handleChange(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}