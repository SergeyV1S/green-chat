import { useState } from "react";

import {
  LinkIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  PlusIcon,
  UsersThreeIcon
} from "@phosphor-icons/react";

import { Button, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";

import { AddContactDialog } from "./AddContactDialog";

export const NewChatPopover = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openSearch = () => {
    setIsMenuOpen(false);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <PopoverTrigger
          render={
            <Button size='icon' aria-label='Новый чат' className='rounded-full cursor-pointer'>
              <PlusIcon size={20} weight='bold' />
            </Button>
          }
        />

        <PopoverContent align='end' className='flex flex-col'>
          <Button variant='ghost' className='justify-start' onClick={openSearch}>
            <MagnifyingGlassIcon size={18} />
            Найти по номеру
          </Button>
          <Button variant='ghost' className='justify-start' disabled>
            <UsersThreeIcon size={18} />
            Создать группу
          </Button>
          <Button variant='ghost' className='justify-start' disabled>
            <MegaphoneIcon size={18} />
            Создать канал
          </Button>
          <Button variant='ghost' className='justify-start' disabled>
            <LinkIcon size={18} />
            Пригласить по ссылке
          </Button>
        </PopoverContent>
      </Popover>

      <AddContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};
