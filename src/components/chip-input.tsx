import { XIcon } from "@/icons/Xicon";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

export function ChipInput({
  items,
  setItems,
}: {
  items: string[];
  setItems: (arg0: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input) {
        setItems([...items, input]);
        setInput("");
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium leading-none" htmlFor="children">
        Children
      </label>
      {items.length !== 0 && (
        <div className="flex flex-wrap items-center p-2 border border-slate-200 rounded-md dark:border-slate-800">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center space-x-2 bg-blue-100 rounded px-2 py-1 text-sm mr-2"
            >
              <span>{item}</span>
              <button
                type="button"
                className="text-blue-500 focus:outline-none"
                onClick={() => setItems(items.filter((i) => i !== item))}
              >
                <XIcon className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Textarea
        className="flex-1 border-none ring-1 ring-slate-200 bg-gray-100 text-sm"
        id="children"
        placeholder={items.length === 0 ? "Enter children" : undefined}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnter}
      />
      <p className="text-xs text-gray-500">press enter to add new children</p>
    </div>
  );
}
