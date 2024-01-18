export default function PageTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div>
      <div>
        <p className="mt-4 text-center text-2xl font-semibold">{title}</p>
        <p className="text-center text-sm">{subTitle}</p>
        <hr className="my-2" />
      </div>
    </div>
  );
}
