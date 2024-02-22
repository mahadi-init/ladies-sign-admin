function lowercaseFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Renders the top section of a page with the specified title.
 *
 * @param {{ title: string }} title - The title of the page
 * @return {JSX.Element} The JSX element representing the top section of the page
 */
export default function PageTop({ title }: { title: string }): JSX.Element {
  return (
    <>
      <h4 className="w-full text-2xl font-bold truncate text-slate-700">
        {title}
      </h4>
      <p>Welcome to {lowercaseFirstLetter(title)}</p>
    </>
  );
}
