/**
 * Renders a full page loading indicator.
 *
 * @return {JSX.Element} The loading indicator component
 */
export default function FullPageLoading(): JSX.Element {
  return (
    <div className="mx-2 animate-pulse lg:ml-[300px]">
      <div className="mt-3 mb-6 h-4 bg-gray-200 rounded" />
      <div className="mb-6 h-4 bg-gray-300 rounded" />
      <div className="mb-6 h-4 bg-gray-200 rounded" />
      <div className="mb-6 h-4 bg-gray-300 rounded" />
      <div className="mb-6 h-4 bg-gray-200 rounded" />
      <div className="mt-3 mb-6 h-4 bg-gray-200 rounded" />
      <div className="mb-6 h-4 bg-gray-300 rounded" />
      <div className="mb-6 h-4 bg-gray-200 rounded" />
      <div className="mb-6 h-4 bg-gray-300 rounded" />
      <div className="mb-6 h-4 bg-gray-200 rounded" />
      <div className="mt-3 mb-6 h-4 bg-gray-200 rounded" />
      <div className="mb-6 h-4 bg-gray-300 rounded" />
      <div className="mb-6 h-4 bg-gray-200 rounded" />
      <div className="mb-6 h-4 bg-gray-300 rounded" />
      <div className="mb-6 h-4 bg-gray-200 rounded" />
    </div>
  );
}
