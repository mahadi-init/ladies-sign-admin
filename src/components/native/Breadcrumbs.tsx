import { ChevronRightIcon } from "@/icons/ChevronRightIcon";
import { Route } from "next";
import Link from "next/link";
import React from "react";

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
          <React.Fragment key={index}>
            <li>
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
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
