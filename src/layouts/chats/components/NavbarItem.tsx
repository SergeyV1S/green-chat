import { NavLink } from "react-router";

import type { Icon } from "@phosphor-icons/react";
import { cn } from "cn";

type NavItemConfig = {
  label: string;
  icon: Icon;
  to: string;
  badge?: number;
};

export const NavbarItem = ({ label, icon: NavIcon, to, badge }: NavItemConfig) => (
  <NavLink to={to} className='group flex w-16 flex-col items-center' end>
    {({ isActive }) => (
      <>
        <span className='relative flex size-11 items-center justify-center rounded-2xl transition-colors'>
          <NavIcon
            size={26}
            className={cn(
              "transition-colors group-hover:text-blue-comet",
              isActive ? "font-medium text-blue-giant" : "text-muted-foreground"
            )}
          />
          {badge && (
            <span className='absolute top-0 -right-1 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-4 font-semibold text-primary-foreground'>
              {badge}
            </span>
          )}
        </span>
        <span
          className={cn(
            "text-xs transition-colors group-hover:text-blue-comet",
            isActive ? "font-medium text-blue-giant" : "text-muted-foreground"
          )}
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
);
