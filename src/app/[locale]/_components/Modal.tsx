import React, { useRef, ElementRef } from "react";
import ReactDOM from "react-dom";

export default function Modal({
  isShowing,
  setIsShowing,
  title,
  children,
  action,
}: {
  isShowing: boolean;
  setIsShowing: (arg0: boolean) => void;
  title: string;
  children: React.ReactNode;
  action: () => void;
}) {
  const wrapperRef = useRef<ElementRef<"div">>(null);

  return (
    <>
      {isShowing && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="flex fixed top-0 left-0 z-20 justify-center items-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-1a content-1a"
              aria-modal="true"
              tabIndex={-1}
              role="dialog"
            >
              <div
                className="flex overflow-hidden flex-col gap-6 p-6 w-11/12 max-w-2xl bg-white rounded shadow-xl max-h-[90vh] text-slate-500 shadow-slate-700/10"
                ref={wrapperRef}
                id="modal"
                role="document"
              >
                <header id="header-1a" className="flex gap-4 items-center">
                  <h3 className="flex-1 text-xl font-medium text-slate-700">
                    {title}
                  </h3>
                  <button
                    onClick={() => setIsShowing(false)}
                    className="inline-flex gap-2 justify-center justify-self-center items-center px-5 h-10 text-sm font-medium tracking-wide text-rose-500 whitespace-nowrap rounded-full transition duration-300 hover:text-rose-600 hover:bg-rose-100 focus:text-rose-700 focus:bg-rose-200 focus-visible:outline-none disabled:text-rose-300 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    aria-label="close dialog"
                  >
                    <span className="relative only:-mx-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-79 desc-79"
                      >
                        <title id="title-79">Icon title</title>
                        <desc id="desc-79">
                          A more detailed description of the icon
                        </desc>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </button>
                </header>

                <div id="content-1a" className="overflow-auto flex-1">
                  {children}
                </div>

                <div className="flex gap-2 justify-start">
                  <button
                    className="inline-flex gap-2 justify-center items-center px-5 h-10 text-sm font-medium tracking-wide text-white whitespace-nowrap bg-rose-500 rounded transition duration-300 hover:bg-rose-600 focus:bg-rose-700 focus-visible:outline-none disabled:bg-rose-300 disabled:border-rose-300 disabled:shadow-none disabled:cursor-not-allowed"
                    onClick={() => action()}
                  >
                    <span>I Accept</span>
                  </button>
                  <button
                    className="inline-flex gap-2 justify-center justify-self-center items-center px-5 h-10 text-sm font-medium tracking-wide text-rose-500 whitespace-nowrap rounded transition duration-300 hover:text-rose-600 hover:bg-rose-100 focus:text-rose-700 focus:bg-rose-200 focus-visible:outline-none disabled:text-rose-300 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    onClick={() => setIsShowing(false)}
                  >
                    <span>I Decline</span>
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
