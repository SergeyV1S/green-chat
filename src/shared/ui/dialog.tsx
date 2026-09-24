import type { ComponentProps } from "react";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

type DialogContentProps = Omit<ComponentProps<typeof DialogPrimitive.Popup>, "className"> & {
  className?: string;
};

const DialogContent = ({ className, children, ...props }: DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Backdrop className='fixed inset-0 z-50 bg-black/40' />
    <DialogPrimitive.Popup
      data-slot='dialog-content'
      className={cn(
        "fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border bg-card p-6 shadow-xl outline-none",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Popup>
  </DialogPrimitive.Portal>
);

type DialogTitleProps = Omit<ComponentProps<typeof DialogPrimitive.Title>, "className"> & {
  className?: string;
};

const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
);

type DialogDescriptionProps = Omit<
  ComponentProps<typeof DialogPrimitive.Description>,
  "className"
> & {
  className?: string;
};

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription };
