function lowercaseFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export default function PageTop({ title }: { title: string }) {
  return (
    <>
      <h4 className="w-full text-2xl font-bold truncate text-slate-700">
        {title}
      </h4>
      <p>Welcome to {lowercaseFirstLetter(title)}</p>
    </>
  );
}
