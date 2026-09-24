import { isSameDay } from "@/shared/utils";

export const formatDateSeparator = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) {
    return "Сегодня";
  }

  if (isSameDay(date, yesterday)) {
    return "Вчера";
  }

  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
};
