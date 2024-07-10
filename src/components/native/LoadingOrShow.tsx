import FetchErrorMessage from "./FetchErrorMessage";
import SixSkeleton from "./SixSkeleton";

export default function LoadingOrShow({
  isLoading,
  error,
  children,
}: {
  isLoading: boolean;
  error: { message: string };
  children: React.ReactNode;
}) {
  if (isLoading) {
    return <SixSkeleton />
  }

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  if (children) {
    return <>{children}</>;
  }
}
