import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="text-primary mx-auto h-12 w-12" />
        <h1 className="text-foreground mt-4 text-6xl font-bold tracking-tight sm:text-7xl">
          404
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Oops, it looks like the page you were looking for doesn&apos;t exist.
          Don&apos;t worry, we&apos;re here to help you find your way back.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="text-primary-foreground hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
            prefetch={false}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
