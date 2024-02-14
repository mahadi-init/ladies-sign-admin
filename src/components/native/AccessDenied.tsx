import Image from "next/image";

/**
 * Render the Access Denied component.
 *
 * @return {JSX.Element} The Access Denied component
 */
export default function AccessDenied(): JSX.Element {
  return (
    <>
      <Image
        src="/access-denied.png"
        width={500}
        height={500}
        alt="access denied"
      />
      <p className="text-lg font-semibold">
        You don&apos;t have the permission to access this page
      </p>
    </>
  );
}
