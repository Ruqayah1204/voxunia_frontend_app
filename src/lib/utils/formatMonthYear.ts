export function formatMonthYear(date: string | Date): string {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

// Thu, 20 Jul 2026 · 6:30 PM
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  const datePart = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} · ${timePart}`;
}

export function formatEndSessionDate(begin: string, end: string): string {
  const beginDate = new Date(begin);
  const endDate = new Date(end);

  const datePart = beginDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const beginTimePart = beginDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  const endTimePart = endDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
  const durationMinutes = Math.round((endDate.getTime() - beginDate.getTime()) / (1000 * 60))

  return `${datePart} · ${beginTimePart} - ${endTimePart} · ${durationMinutes} minutes`; 

}