import { Outlet } from "react-router";

import { Separator } from "@/shared/ui";

import { NavbarItem } from "./components/NavbarItem";
import { contactsNav, footerNav, mainNav } from "./constants";

export const ChatsLayout = () => (
  <div className='flex h-svh w-full overflow-hidden bg-background'>
    <nav className='flex w-24 shrink-0 flex-col items-center gap-5 border-r py-5 max-[925px]:hidden'>
      <div className='space-y-4'>
        {mainNav.map((item) => (
          <NavbarItem key={item.label} {...item} />
        ))}
      </div>

      <div className='w-10'>
        <Separator />
      </div>

      <div className='space-y-4'>
        {contactsNav.map((item) => (
          <NavbarItem key={item.label} {...item} />
        ))}
      </div>

      <div className='mt-auto space-y-4'>
        {footerNav.map((item) => (
          <NavbarItem key={item.label} {...item} />
        ))}
      </div>
    </nav>

    <nav className='hidden max-[925px]:flex items-center fixed bottom-0 left-0 w-full justify-around z-50 bg-white py-2 px-3 shadow-[0px_-1px_24px_#0000001a]'>
      {contactsNav.map((item) => (
        <NavbarItem key={item.label} {...item} />
      ))}
      <NavbarItem {...mainNav[0]} label='Чаты' />
      {footerNav.map((item) => (
        <NavbarItem key={item.label} {...item} />
      ))}
    </nav>

    <Outlet />
  </div>
);
