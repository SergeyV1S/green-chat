export const getInitials = (value: string) => {
  const parts = value.trim().split(/\s+/).filter(Boolean);

  if (!parts.length) {
    return "#";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};
