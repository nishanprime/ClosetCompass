import { ColumnDef } from "@tanstack/react-table";

export default interface ITableProps<T> {
    columns: ColumnDef<T, any>[];
    data: T[];
    sort: IColumnSort | null;
    onSort?: (sort: IColumnSort | null) => void;
    loading?: boolean;
    clickable?: boolean;
    onRowClick?: (record: T) => void;
    notFoundType?: string;
    fullPageLoading?: boolean;
  }
  
  export interface ITableColumn<T> {
    title: string;
    //key of T or any other interface within T
    dataIndex?: keyof T | string;
    key: string;
    width?: string;
    render?: (text: string, record: T) => React.ReactNode;
    sort?: string;
    richText?: boolean;
    textAlign?: string;
  }
  
  export interface IColumnSort {
    field: string;
    order: "ASC" | "DESC";
  }
  
  export interface IPagination {
    current: number;
    pageSize: 10 | 20 | 50 | 100;
    skip: number;
  }
  