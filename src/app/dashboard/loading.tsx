import LoadingSkeleton from "@/components/native/LoadingSkeleton";
import PageTop from "@/components/native/PageTop";

export default function Loading() {
  return <>
    <>
      <div className="w-32 h-12 bg-gray-200 animate-pulse rounded-lg" />
      <div className="w-56 mt-2 h-12 bg-gray-200 anime-pluse rounded-lg" />
    </>
    <div className="flex flex-col gap-2 mt-4">
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  </>
}
