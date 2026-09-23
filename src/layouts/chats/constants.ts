import {
  BroadcastIcon,
  ChatCircleDotsIcon,
  GearSixIcon,
  PhoneIcon,
  TrayIcon,
  UsersIcon
} from "@phosphor-icons/react";

import { PATHS } from "@/shared/constants/paths";

const mainNav = [
  { label: "Все", icon: ChatCircleDotsIcon, to: `/${PATHS.CHAT}`, badge: 1 },
  { label: "Новые", icon: TrayIcon, to: "/new" },
  { label: "Каналы", icon: BroadcastIcon, to: "/channels" }
];

const contactsNav = [
  { label: "Контакты", icon: UsersIcon, to: "/contacts" },
  { label: "Звонки", icon: PhoneIcon, to: "/calls" }
];

const settingsNav = { label: "Настройки", icon: GearSixIcon, to: "/settings" };

export { mainNav, contactsNav, settingsNav };
