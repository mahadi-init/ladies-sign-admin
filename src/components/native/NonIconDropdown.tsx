import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NonIconDropdownSelect({
  style,
  placeholder,
  items,
  selectedItem,
  setSelectedItem,
  action,
}: {
  style?: string;
  placeholder?: string;
  items: string[];
  selectedItem?: string;
  setSelectedItem: (item: string) => void;
  action?: <T>(value: T) => void;
}): JSX.Element {
  return (
    <Select
      value={selectedItem}
      onValueChange={(value) => {
        setSelectedItem(value);
        if (action) {
          action(value);
        }
      }}
    >
      <SelectTrigger className={style ?? "w-32"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item, index) => {
            return (
              <SelectItem
                key={index}
                value={item}
                className="text-xs font-medium"
              >
                {item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
