import LoadingSkeleton from "@/components/native/LoadingSkeleton";

export default function Loading() {
  return (
    <>
      <>
        <div className="h-12 w-32 animate-pulse rounded-lg bg-gray-200" />
        <div className="anime-pluse mt-2 h-12 w-56 rounded-lg bg-gray-200" />
      </>
      <div className="mt-4 flex flex-col gap-2">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    </>
  );
}