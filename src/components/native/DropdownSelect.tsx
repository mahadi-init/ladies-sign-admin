import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Function for rendering a dropdown select component with given options.
 *
 * @param {Object} param0 - Destructured object containing style, name,
 * placeholder, items, selectedItem, and setSelectedItem
 * @return {JSX.Element} The rendered dropdown select component
 */
export default function DropdownSelect({
  style,
  name,
  placeholder,
  items,
  selectedItem,
  setSelectedItem,
}: {
  style?: string;
  placeholder?: string;
  name?: string;
  items: string[];
  selectedItem?: string;
  setSelectedItem: (item: string) => void;
}): JSX.Element {
  return (
    <Select value={selectedItem} onValueChange={setSelectedItem} name={name}>
      <SelectTrigger className={style ?? "w-32"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item, index) => {
            return (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
