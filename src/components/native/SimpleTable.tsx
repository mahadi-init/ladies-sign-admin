import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SimpleTableProps = {
  heads: string[];
  data?: string[] | { name: string; code: string }[];
};

export function SimpleTable({ heads, data }: SimpleTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">INDEX</TableHead>
          {heads.map((head) => (
            <TableHead key={head}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((datum, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              {typeof datum === "string" ? (
                <TableCell>{datum}</TableCell>
              ) : (
                <>
                  <TableCell>{datum.name}</TableCell>
                  <TableCell
                    style={{
                      background: datum.code,
                    }}
                  >
                    {datum.code}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
