import { useRouteError } from "react-router";

import { ArrowClockwiseIcon, WarningCircleIcon } from "@phosphor-icons/react";

import { Button } from "@/shared/ui/button";

export const RouteError = () => {
  const error = useRouteError();
  const description = error instanceof Error ? error.message : "Попробуйте обновить страницу";

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-5 p-4 text-center'>
      <div className='flex size-16 items-center justify-center rounded-full bg-destructive/10'>
        <WarningCircleIcon size={36} weight='fill' className='text-destructive' />
      </div>

      <div className='flex flex-col gap-1'>
        <h1 className='text-xl font-semibold text-foreground'>Что-то пошло не так</h1>
        <p className='max-w-sm text-sm wrap-break-word text-muted-foreground'>{description}</p>
      </div>

      <Button variant='gradient' size='lg' onClick={() => window.location.reload()}>
        <ArrowClockwiseIcon size={18} weight='bold' />
        Обновить страницу
      </Button>
    </div>
  );
};
