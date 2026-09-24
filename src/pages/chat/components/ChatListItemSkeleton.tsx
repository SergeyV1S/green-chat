import { Skeleton } from "@/shared/ui";

export const ChatListItemSkeleton = () => (
  <div className='flex items-center gap-3 px-2 py-1.5'>
    <Skeleton className='size-12 shrink-0 rounded-full' />
    <div className='flex min-w-0 flex-1 flex-col gap-2'>
      <Skeleton className='h-4 w-32' />
      <Skeleton className='h-3 w-48' />
    </div>
  </div>
);
