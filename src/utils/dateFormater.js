export const formatDate = (dateString) => {
  if (!dateString) {
    return;
  }

  const date = new Date(dateString);

  const dayName = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
  }).format(date);
  const day = date.getDate();
  const monthName = new Intl.DateTimeFormat("en-GB", {
    month: "short",
  }).format(date);
  const year = date.getFullYear();
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dayName}, ${day} ${monthName} ${year} (${time})`;
};
