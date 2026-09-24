import type { ComponentProps } from "react";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "cn";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

type PopoverContentProps = Omit<ComponentProps<typeof PopoverPrimitive.Popup>, "className"> & {
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

const PopoverContent = ({
  className,
  align = "end",
  sideOffset = 8,
  ...props
}: PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner align={align} sideOffset={sideOffset} className='z-50'>
      <PopoverPrimitive.Popup
        data-slot='popover-content'
        className={cn(
          "min-w-56 rounded-2xl border bg-popover p-1 text-popover-foreground shadow-md outline-none",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
);

export { Popover, PopoverTrigger, PopoverContent };
