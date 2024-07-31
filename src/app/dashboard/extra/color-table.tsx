"use client";
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
  data?: { name: string; code: string }[];
  setRerender: (arg0: number) => void;
};

export function ColorTable({ heads, data, setRerender }: SimpleTableProps) {
  const deleteItem = (colorName: string) => {
    let colors = localStorage.getItem("colors");
    let colorsArray: { name: string; code: string }[] = [];

    if (colors) {
      colorsArray = JSON.parse(colors);
    }

    const filteredArray = colorsArray.filter((item) => item.name !== colorName);
    localStorage.setItem("colors", JSON.stringify(filteredArray));
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
              <TableCell>{datum.name}</TableCell>
              <TableCell>{datum.code}</TableCell>
              <TableCell
                style={{
                  background: datum.code,
                }}
              >
                {datum.code}
              </TableCell>
              <TableCell className="items-center">
                <div className="w-full items-center pl-5">
                  <Trash2
                    size={20}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => {
                      deleteItem(datum.name);
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
