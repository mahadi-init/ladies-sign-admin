interface FetchErrorMessageProps {}

export default function FetchErrorMessage({
  error,
}: {
  error: { message: string };
}) {
  return (
    <div className="w-full rounded-lg p-4 flex justify-center items-center">
      <p className="text-red-600 text-xl">{error.message}</p>
    </div>
  );
}
