import { useMemo } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { IPagination } from "@/interfaces";
import { Button } from "@chakra-ui/react";

const TablePagination = ({
  total,
  pagination,
  setPagination,
}: {
  total: number;
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
}) => {
  const { current, pageSize } = pagination;

  const onNextPage = () => {
    setPagination({
      ...pagination,
      current: current + 1,
      skip: current * pageSize,
    });
  };

  const onPrevPage = () => {
    setPagination({
      ...pagination,
      current: current - 1,
      skip: (current - 2) * pageSize,
    });
  };

  const totalPages = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pagination]
  );

  const isNextDisabled = useMemo(
    () => current === totalPages,
    [current, totalPages]
  );

  const isPrevDisabled = useMemo(() => current === 1, [current]);

  return (
    <div className="flex text-sm items-center gap-3">
      <p>
        {current}-{totalPages} of {total}
      </p>

      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={onPrevPage} disabled={isPrevDisabled}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button variant="ghost" onClick={onNextPage} disabled={isNextDisabled}>
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
