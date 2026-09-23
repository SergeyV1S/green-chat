import { Outlet } from "react-router";

import { Separator } from "@/shared/ui";

import { NavbarItem } from "./components/NavbarItem";
import { contactsNav, mainNav, settingsNav } from "./constants";

export const ChatsLayout = () => (
  <div className='flex h-svh w-full overflow-hidden bg-background'>
    <nav className='flex w-24 shrink-0 flex-col items-center gap-5 border-r py-5'>
      <div className='flex flex-col gap-4'>
        {mainNav.map((item) => (
          <NavbarItem key={item.label} {...item} />
        ))}
      </div>

      <div className='w-10'>
        <Separator />
      </div>

      <div className='flex flex-col gap-4'>
        {contactsNav.map((item) => (
          <NavbarItem key={item.label} {...item} />
        ))}
      </div>

      <div className='mt-auto'>
        <NavbarItem {...settingsNav} />
      </div>
    </nav>

    <Outlet />
  </div>
);
