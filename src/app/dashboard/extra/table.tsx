import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

type SimpleTableProps = {
  heads: string[];
  data?: string[];
  setRerender: (arg0: number) => void;
};

export function SizeTable({ heads, data, setRerender }: SimpleTableProps) {
  const deleteItem = (size: string) => {
    let sizes = localStorage.getItem("sizes");
    let sizesArray: string[] = [];

    if (sizes) {
      sizesArray = JSON.parse(sizes);
    }

    const filteredArray = sizesArray.filter((item) => item !== size);
    localStorage.setItem("sizes", JSON.stringify(filteredArray));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">INDEX</TableHead>
          {heads.map((head) => (
            <TableHead key={head} className="w-[100px]">
              {head}
            </TableHead>
          ))}

          <TableHead className="w-[100px]">ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((datum, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium"># {index + 1}</TableCell>
              <TableCell>{datum}</TableCell>
              <TableCell className="font-medium">
                <div className="w-full items-center pl-5">
                  <Trash2
                    size={20}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => {
                      deleteItem(datum);
                      setRerender(Math.random());
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
