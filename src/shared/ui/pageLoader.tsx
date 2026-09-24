import { Spinner } from "@/shared/ui/spinner";

export const PageLoader = () => (
  <div className='flex flex-1 items-center justify-center'>
    <Spinner className='size-8 text-muted-foreground' />
  </div>
);
