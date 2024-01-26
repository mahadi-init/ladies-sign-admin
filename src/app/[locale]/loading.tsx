import LoadingSkeleton from "../../components/native/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="m-2">
      <div className="ml-1">
        <LoadingSkeleton />
        <div className="mt-3"></div>
        <LoadingSkeleton />
        <div className="mt-3"></div>
        <LoadingSkeleton />
      </div>
    </div>
  );
}
