"use client";

import { useMemo, useState } from "react";

import { IColumnSort, IPagination } from "@/interfaces";

export const useTable = () => {
  const [sort, setSort] = useState<IColumnSort | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [pagination, setPagination] = useState<IPagination>({
    current: 1,
    pageSize: 10,
    skip: 0,
  });
  const [search, setSearch] = useState<string>("");

  const values = useMemo(() => {
    return {
      sort,
      setSort,
      total,
      setTotal,
      pagination,
      setPagination,
      search,
      setSearch,
    };
  }, [sort, total, pagination, search]);

  return values;
};


