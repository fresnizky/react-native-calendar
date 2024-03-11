export function getPreviousMonth(month, year) {
  if (month === 0) {
    return { month: 11, year: year - 1 };
  } else {
    return { month: month - 1, year };
  }
}

export function getCalendar(month, year) {
  const calendar = [];
  let week = [];
  let day = 1;
  let extraDays = 1;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDayofWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const daysInMonth = lastDay.getDate();

  const prevMonth = getPreviousMonth(month, year);
  const daysInPrevMonth = new Date(
    prevMonth.year,
    prevMonth.month + 1,
    0
  ).getDate();

  for (let i = 0; i < startDayofWeek; i++) {
    week.push({
      day: daysInPrevMonth - startDayofWeek + i + 1,
      state: "disabled",
    });
  }

  for (let i = startDayofWeek; i < 7; i++) {
    week.push({ day: i - startDayofWeek + 1, state: "normal" });
    day++;
  }
  calendar.push(week);

  while (day <= daysInMonth) {
    week = [];

    for (let i = 0; i < 7 && day <= daysInMonth; i++) {
      week.push({ day, state: "normal" });
      day++;
    }

    while (week.length < 7) {
      week.push({ day: extraDays, state: "disabled" });
      extraDays++;
    }

    calendar.push(week);
  }

  return calendar;
}
