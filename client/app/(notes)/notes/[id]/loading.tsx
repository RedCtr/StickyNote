import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid w-full gap-10">
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-[38px] w-[90px] rounded" />
        <Skeleton className="h-[38px] w-[80px] rounded" />
      </div>
      <div className="mx-auto w-[800px] space-y-6">
        <Skeleton className="h-[50px] w-full rounded-[6px]" />
        <Skeleton className="h-[20px] w-2/3 rounded-[6px]" />
        <Skeleton className="h-[20px] w-full rounded-[6px]" />
        <Skeleton className="h-[20px] w-full rounded-[6px]" />
      </div>
    </div>
  );
}
