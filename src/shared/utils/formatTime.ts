const toHoursAndMinutes = (timestamp?: number) => {
  if (!timestamp) {
    return;
  }

  return new Date(timestamp * 1000).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  });
};

export { toHoursAndMinutes };
