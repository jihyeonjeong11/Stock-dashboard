import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="flex gap-2 pt-8 items-center rounded-md">
      <Skeleton className="w-[50px] h-[40px]" />
      <Skeleton className="h-12 w-[20rem]" />
    </div>
  );
}

export function PriceCardSkeleton() {
  return (
    <>
      <Skeleton className="rounded-lg w-48 h-24" />
      <Skeleton className="rounded-lg w-48 h-24" />
      <Skeleton className="rounded-lg w-48 h-24" />
      <Skeleton className="rounded-lg w-48 h-24" />
      <Skeleton className="rounded-lg w-48 h-24" />
      <Skeleton className="rounded-lg w-48 h-24" />
    </>
  );
}

export function ChartSkeleton() {
  return <Skeleton className="rounded-lg w-[300px] h-[300px]" />;
}
