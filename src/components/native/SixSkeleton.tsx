import LoadingSkeleton from "./LoadingSkeleton";

export default function SixSkeleton() {
  return (
    <div className="w-full flex flex-wrap gap-2 p-2">
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  );
}
