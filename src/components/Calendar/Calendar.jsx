import { useMemo, useState } from "react";
import "./Calendar.css";

export default function Calendar() {
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  // Compute "today" once per component mount (stable reference)
  const todayDate = useMemo(() => new Date(), []);

  const cells = useMemo(() => buildMonthGrid(viewDate, true), [viewDate]);

  const monthLabel = viewDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  function prevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function nextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="calendar-elements">
      <div className="calendar-header">
        <button className="calendar-prev" onClick={prevMonth}>
          ◀
        </button>
        <h3>{monthLabel}</h3>
        <button className="calendar-next" onClick={nextMonth}>
          ▶
        </button>
      </div>

      <div className="calendar-grid">
        {weekDays.map((w) => (
          // If your CSS uses .calendar-dow, keep this class
          <div key={w} className="calendar-dow">
            {w}
          </div>
        ))}

        {cells.map(({ date, inMonth }) => {
          const selected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, todayDate);

          const className =
            "calendar-cell" +
            (inMonth ? "" : " is-outside") +
            (selected ? " is-selected" : "") +
            (isToday ? " is-today" : "");

          return (
            <button
              type="button"
              key={date.toISOString()}
              className={className}
              onClick={() => setSelectedDate(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildMonthGrid(viewDate, weekStartOnMonday = true) {
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate); // kept (even if unused) for clarity

  const startDay = monthStart.getDay();
  const mondayOffset = weekStartOnMonday ? (startDay + 6) % 7 : startDay;

  const gridStart = addDays(monthStart, -mondayOffset);

  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i)).map(
    (d) => ({
      date: d,
      inMonth: d.getMonth() === viewDate.getMonth(),
    })
  );
}
