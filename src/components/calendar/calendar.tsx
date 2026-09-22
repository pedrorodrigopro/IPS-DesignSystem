// Calendar — Figma node 3506:209189
// Types: Date, Range, Date & Time
// Day selector states from node 2143:140771
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../icon/icon";
import css from "./calendar.module.scss";

export type CalendarType = "date" | "range" | "date-time";

export type CalendarProps = {
  type?: CalendarType;
  /** Controlled selected date (date type) */
  value?: Date | null;
  /** Controlled range (range type) */
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  /** Time value string "HH:MM" (date-time type) */
  timeValue?: string;
  onChange?: (date: Date) => void;
  onRangeChange?: (start: Date | null, end: Date | null) => void;
  onTimeChange?: (time: string) => void;
  className?: string;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const first = new Date(year, month, 1);
  // Start from Monday of the week containing the 1st
  const startDay = (first.getDay() + 6) % 7; // Mon=0 ... Sun=6
  for (let i = -startDay; i < 42 - startDay; i++) {
    days.push(new Date(year, month, 1 + i));
  }
  return days;
}

function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) { return false; }
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isBetween(date: Date, start: Date | null | undefined, end: Date | null | undefined): boolean {
  if (!start || !end) { return false; }
  const t = date.getTime();
  return t > start.getTime() && t < end.getTime();
}

type DayCellProps = {
  date: Date;
  currentMonth: number;
  selected?: boolean;
  rangeStart?: boolean;
  rangeEnd?: boolean;
  inRange?: boolean;
  onClick: () => void;
  isRange?: boolean;
};

const DayCell = ({ date, currentMonth, selected, rangeStart, rangeEnd, inRange, onClick, isRange }: DayCellProps) => {
  const isCurrentMonth = date.getMonth() === currentMonth;
  const isSelected = selected || rangeStart || rangeEnd;

  return (
    <button
      type="button"
      className={classNames(css.day, {
        [css.dayOtherMonth]: !isCurrentMonth,
        [css.daySelected]: isSelected,
        [css.dayInRange]: inRange && isRange,
        [css.dayRangeStart]: rangeStart && isRange,
        [css.dayRangeEnd]: rangeEnd && isRange,
        [css.dayRangeMid]: inRange && !rangeStart && !rangeEnd && isRange,
      })}
      onClick={onClick}
      aria-label={date.toDateString()}
      aria-pressed={isSelected}
    >
      {date.getDate().toString().padStart(2, "0")}
    </button>
  );
};

export const Calendar = ({
  type = "date",
  value,
  rangeStart,
  rangeEnd,
  timeValue = "00:00",
  onChange,
  onRangeChange,
  onTimeChange,
  className,
}: CalendarProps) => {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(
    (value ?? rangeStart ?? today).getMonth()
  );
  const [viewYear, setViewYear] = useState(
    (value ?? rangeStart ?? today).getFullYear()
  );
  // For range: track click state (first click = start, second = end)
  const rangeStep = useRef<"start" | "end">("start");

  useEffect(() => {
    if (value) { setViewMonth(value.getMonth()); setViewYear(value.getFullYear()); }
  }, [value]);

  const days = getDaysInMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else { setViewMonth((m) => m - 1); }
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else { setViewMonth((m) => m + 1); }
  };

  const handleDayClick = (date: Date) => {
    if (type === "range") {
      if (rangeStep.current === "start" || !rangeStart) {
        onRangeChange?.(date, null);
        rangeStep.current = "end";
      } else {
        const start = rangeStart!;
        if (date < start) {
          onRangeChange?.(date, start);
        } else {
          onRangeChange?.(start, date);
        }
        rangeStep.current = "start";
      }
    } else {
      onChange?.(date);
    }
  };

  const isRange = type === "range";

  return (
    <div className={classNames(css.calendar, className)}>
      {/* Header */}
      <div className={css.header}>
        <div className={css.headerInputs}>
          <select
            className={css.headerSelect}
            value={viewMonth}
            onChange={(e) => setViewMonth(Number(e.target.value))}
            aria-label="Month"
          >
            {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          <select
            className={css.headerSelect}
            value={viewYear}
            onChange={(e) => setViewYear(Number(e.target.value))}
            aria-label="Year"
          >
            {Array.from({ length: 20 }, (_, i) => today.getFullYear() - 5 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className={css.headerNav}>
          <button type="button" className={css.navBtn} onClick={prevMonth} aria-label="Previous month">
            <Icon name="chevron-left" size={16} />
          </button>
          <button type="button" className={css.navBtn} onClick={nextMonth} aria-label="Next month">
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className={css.weekdays}>
        {WEEKDAYS.map((d) => (
          <div key={d} className={css.weekday}>{d}</div>
        ))}
      </div>

      {/* Day grid — 6 weeks × 7 days */}
      <div className={css.grid}>
        {Array.from({ length: 6 }, (_, weekIdx) => (
          <div key={weekIdx} className={css.week}>
            {days.slice(weekIdx * 7, weekIdx * 7 + 7).map((date, dayIdx) => (
              <DayCell
                key={dayIdx}
                date={date}
                currentMonth={viewMonth}
                selected={!isRange && isSameDay(date, value)}
                rangeStart={isRange && isSameDay(date, rangeStart)}
                rangeEnd={isRange && isSameDay(date, rangeEnd)}
                inRange={isRange && isBetween(date, rangeStart, rangeEnd)}
                onClick={() => handleDayClick(date)}
                isRange={isRange}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Time input — Date & Time type only */}
      {type === "date-time" && (
        <div className={css.timeRow}>
          <input
            type="time"
            className={css.timeInput}
            value={timeValue}
            onChange={(e) => onTimeChange?.(e.target.value)}
            aria-label="Time"
          />
        </div>
      )}
    </div>
  );
};
