import type { ReactNode } from "react";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  CheckCircleIcon,
  InfoIcon,
  SpinnerIcon,
  WarningIcon,
  XCircleIcon,
  XIcon
} from "@phosphor-icons/react";
import { cn } from "cn";

import { Button } from "@/shared/ui/button";

const toast = ToastPrimitive.createToastManager();

const TOAST_MOTION = cn(
  "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
  "h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
  "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
  "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
  "data-limited:opacity-0 data-starting-style:[transform:translateY(150%)]",
  "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
  "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
  "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
  "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
  "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
  "data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
  "data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]"
);

const TOAST_TYPE_ACCENT: Record<string, string> = {
  error: "border-destructive/30",
  success: "border-emerald-500/30",
  warning: "border-amber-500/30"
};

const ToastIcon = ({ type }: { type: string | undefined }) => {
  let icon: ReactNode = null;

  if (type === "success") {
    icon = <CheckCircleIcon weight='fill' className='text-emerald-500' aria-hidden='true' />;
  }

  if (type === "info") {
    icon = <InfoIcon weight='fill' className='text-primary' aria-hidden='true' />;
  }

  if (type === "warning") {
    icon = <WarningIcon weight='fill' className='text-amber-500' aria-hidden='true' />;
  }

  if (type === "error") {
    icon = <XCircleIcon weight='fill' className='text-destructive' aria-hidden='true' />;
  }

  if (type === "loading") {
    icon = <SpinnerIcon className='animate-spin text-muted-foreground' aria-hidden='true' />;
  }

  if (!icon) {
    return null;
  }

  return (
    <span
      data-slot='toast-icon'
      className="mt-0.5 shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5"
    >
      {icon}
    </span>
  );
};

const ToastList = () => {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((item) => (
    <ToastPrimitive.Root
      key={item.id}
      toast={item}
      data-slot='toast'
      className={cn(
        "group/toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-2xl border bg-card text-card-foreground shadow-lg will-change-transform outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
        TOAST_MOTION,
        TOAST_TYPE_ACCENT[item.type ?? ""]
      )}
    >
      <ToastPrimitive.Content className='flex h-full items-start gap-3 p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100'>
        <ToastIcon type={item.type} />

        <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
          <ToastPrimitive.Title className='text-sm font-semibold text-foreground' />
          <ToastPrimitive.Description className='text-sm break-words text-muted-foreground' />
        </div>

        <ToastPrimitive.Close
          aria-label='Закрыть'
          render={<Button variant='ghost' size='icon-sm' />}
          className='shrink-0 text-muted-foreground hover:text-foreground'
        >
          <XIcon aria-hidden='true' />
        </ToastPrimitive.Close>
      </ToastPrimitive.Content>
    </ToastPrimitive.Root>
  ));
};

const Toaster = ({ children, toastManager = toast, ...props }: ToastPrimitive.Provider.Props) => (
  <ToastPrimitive.Provider toastManager={toastManager} {...props}>
    {children}
    <ToastPrimitive.Portal data-slot='toast-portal'>
      <ToastPrimitive.Viewport
        data-slot='toast-viewport'
        className='pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full'
      >
        <ToastList />
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  </ToastPrimitive.Provider>
);

export { Toaster, toast };
