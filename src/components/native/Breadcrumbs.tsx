import { ChevronRightIcon } from "@/icons/ChevronRightIcon";
import { Route } from "next";
import Link from "next/link";

interface BreadcrumbsProps {
  title: string;
  link: string;
}

export function Breadcrumbs({ props }: { props: BreadcrumbsProps[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 text-sm"
    >
      <ol className="flex items-center space-x-2">
        {props.map((item, index) => (
          <>
            <li key={index}>
              <Link
                className="font-medium text-sm flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900 "
                href={item.link as Route}
              >
                {item.title}
                {index !== props.length - 1 ? (
                  <ChevronRightIcon className="w-4 h-4" />
                ) : null}
              </Link>
            </li>
          </>
        ))}
      </ol>
    </nav>
  );
}
