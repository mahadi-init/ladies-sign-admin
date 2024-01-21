export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col p-2 mt-36 lg:justify-between lg:ml-72 lg:w-8/12 xl:flex-row xl:w-9/12 2xl:w-10/12">
      {children}
    </div>
  );
}
