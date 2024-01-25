export default function PageTop({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div className="fixed top-0 w-full bg-white">
      <p className="mt-4 text-2xl font-semibold text-center">{title}</p>
      <p className="text-sm text-center">{subTitle}</p>
      <hr className="my-2" />
    </div>
  );
}
