const AVATAR_CLASSNAMES = [
  "bg-brand-gradient",
  "bg-gradient-to-b from-amber-400 to-orange-500",
  "bg-gradient-to-b from-emerald-400 to-teal-500",
  "bg-gradient-to-b from-sky-400 to-indigo-500",
  "bg-gradient-to-b from-pink-400 to-rose-500",
  "bg-gradient-to-b from-violet-400 to-fuchsia-500"
];

export const getAvatarClassName = (idStr: string) => {
  let hash = 0;

  for (const char of idStr) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  return AVATAR_CLASSNAMES[hash % AVATAR_CLASSNAMES.length];
};
