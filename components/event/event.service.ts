const formatDate = (date: string) => {
  const dateArr = date.split('/');
  return new Date(Number(dateArr[2]), Number(dateArr[1]) - 1, Number(dateArr[0]));
};

export const nextEvents = (events: []) =>
  events
    .map(([date, title, city]: [string, string, string]) => ({
      displayDate: date,
      date: formatDate(date),
      title,
      city,
    }))
    .filter(({ date }) => date > new Date(Date.now()))
    .reverse();
