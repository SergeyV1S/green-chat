import {
  BroadcastIcon,
  ChatCircleDotsIcon,
  GearSixIcon,
  PhoneIcon,
  SignOutIcon,
  TrayIcon,
  UsersIcon
} from "@phosphor-icons/react";

import { logout } from "@/pages/auth/helpers";
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

const footerNav = [
  { label: "Настройки", icon: GearSixIcon, to: "/settings" },
  { label: "Выйти", icon: SignOutIcon, to: "#", onClick: logout }
];

export { mainNav, contactsNav, footerNav };
