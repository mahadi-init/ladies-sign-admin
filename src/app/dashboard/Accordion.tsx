import React from "react";

export default function AccordionElevated() {
  return (
    <>
      <section className="w-full divide-y">
        <details className="group p-4">
          <summary className="relative cursor-pointer list-none pr-8 text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
            Hello
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby="title-ac13 desc-ac13"
            >
              <title id="title-ac13">Open icon</title>
              <desc id="desc-ac13">
                icon that represents the state of the summary
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </summary>
          <p className="mt-4 text-slate-500">Nice</p>
        </details>
      </section>
    </>
  );
}
