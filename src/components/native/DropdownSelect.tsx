import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DropdownSelect({
  style,
  placeholder,
  items,
  selectedItem,
  setSelectedItem,
}: {
  style?: string;
  placeholder?: string;
  items: string[];
  selectedItem?: string;
  setSelectedItem: (item: string) => void;
}): JSX.Element {
  return (
    <Select value={selectedItem} onValueChange={setSelectedItem}>
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
