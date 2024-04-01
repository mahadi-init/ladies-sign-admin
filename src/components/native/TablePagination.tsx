import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";

export default function TablePagination({
  index,
  setIndex,
  disableNext,
}: {
  index: number;
  setIndex: (arg0: number) => void;
  disableNext?: boolean;
}) {
  return (
    <div className="flex justify-end items-center py-4 space-x-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              size="sm"
              variant="outline"
              disabled={index === 1}
              onClick={() => {
                if (index > 1) {
                  setIndex(index - 1);
                }
              }}
            >
              <PaginationPrevious />
            </Button>
          </PaginationItem>

          {/* FIXME:IMPLEMENT PAGINATION */}
          {/* <PaginationItem>
            <PaginationLink isActive={index === 1} onClick={() => setIndex(1)}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => setIndex(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{index + 2}</PaginationLink>
          </PaginationItem> */}

          <PaginationItem>
            <Button
              disabled={disableNext}
              size="sm"
              variant="outline"
              onClick={() => setIndex(index + 1)}
            >
              <PaginationNext />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
