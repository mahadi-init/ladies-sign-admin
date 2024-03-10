import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronUpIcon } from "@/icons/ChevronDown";
import { ChevronDownIcon } from "@/icons/ChevronUp";
import { XIcon } from "@/icons/Xicon";

export function ProductCategoryAccordin() {
  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-1"
          htmlFor="product-category"
        >
          Product Category
        </label>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            Headphones <XIcon className="ml-1" />
          </Badge>
          <Badge variant="secondary">
            Kids Headphones <XIcon className="ml-1" />
          </Badge>
          <Badge variant="secondary">
            On-Ear Headphones <XIcon className="ml-1" />
          </Badge>
        </div>
      </div>
      <ScrollArea className="h-72 w-full rounded-md border border-slate-200 bg-white dark:border-slate-800">
        <ul className="py-2">
          <li className="px-4 py-2 flex justify-between items-center border-b">
            <span>Headphones</span>
            <ChevronUpIcon />
          </li>
          <li className="px-4 py-2 border-b">Kids Headphones</li>
          <li className="px-4 py-2 border-b">Bluetooth Headphones</li>
          <li className="px-4 py-2 border-b">On-Ear Headphones</li>
          <li className="px-4 py-2 flex justify-between items-center border-b">
            <span>Mobile Tablets</span>
            <ChevronDownIcon />
          </li>
          <li className="px-4 py-2 flex justify-between items-center border-b">
            <span>CPU Heat Pipes</span>
            <ChevronDownIcon />
          </li>
          <li className="px-4 py-2 flex justify-between items-center border-b">
            <span>Smart Watch</span>
            <ChevronDownIcon />
          </li>
          <li className="px-4 py-2 flex justify-between items-center">
            <span>Bluetooth</span>
            <ChevronDownIcon />
          </li>
        </ul>
      </ScrollArea>
    </div>
  );
}
