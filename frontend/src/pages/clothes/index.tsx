import { useMutation, useQuery } from "react-query";
import AddClothForm from "@/components//AddCloth";
import AddTag from "@/components//AddTag";
import { ClothService } from "@/services";
import { handleSuccess } from "@/utils";
import { useTable } from "@/hook/useTable";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { Button, Skeleton } from "@chakra-ui/react";
import TablePagination from "../../components/Table/tablePagination";
import SearchToolbar from "../../components/Table/searchbar";

const ClothPages = () => {
  const {
    sort,
    pagination,
    setPagination,
    search,
    setSearch,
    total,
  } = useTable();

  const {
    data,
    isLoading: loading,
    refetch,
  } = useQuery(
    ["clothe-inventory", { sort, pagination, search, total }],
    () => {
      return ClothService.getAllClothes({
        search: search,
        page: pagination.current,
        page_size: pagination.pageSize,
        sort_by: sort?.field || "created_at",
        sort_order: sort?.order || "DESC",
      });
    }
  );

  const { mutateAsync, isLoading } = useMutation(ClothService.addCloth, {
    onSuccess: () => {
      handleSuccess("Cloth added successfully");
      refetch();
    },
  });

  type ClothTableEntries = {
    id: string;
    description: string;
    no_of_wears: number;
    wears_remaining: number;
    media_id: string;
    actions: React.ReactNode;
  };

  const columnHelper = createColumnHelper<ClothTableEntries>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "Description",
    }),
    columnHelper.accessor("no_of_wears", {
      cell: (info) => info.getValue(),
      header: "No of Wears",
    }),
    columnHelper.accessor("wears_remaining", {
      cell: (info) => info.getValue(),
      header: "Wears Remaining",
    }),
    columnHelper.accessor("media_id", {
      cell: (info) => {
        return (
          <img
            src={`${import.meta.env.VITE_API_URI}/files/${info.getValue()}`}
            alt="cloth"
            className=" w-16"
          />
        );
      },
      header: "Image",
    }),
    columnHelper.accessor("id", {
      cell: (info) => {
        return (
          <Button
            colorScheme="blue"
            onClick={async () => {
              await ClothService.deleteClothById(info.getValue());
              refetch();
            }}
          >
            Delete
          </Button>
        );
      },
      header: "Actions",
    }),
  ];

  return (
    <div>
      <div className="w-full h-screen flex gap-4 p-4">
        <div className="w-1/4">
          <AddClothForm onSubmit={mutateAsync} isLoading={isLoading} />
          <AddTag />
        </div>
        <Skeleton isLoaded={!loading} height={"50%"} className="w-3/4">
          <div className="w-full flex flex-col items-start gap-4">
            <div className=" min-w-[400px]">
              <SearchToolbar setSearch={setSearch} placeholder="Search Cloth" />
            </div>
            <CustomTable data={data?.cloths || []} columns={columns} />
            <TablePagination
              total={total || 0}
              pagination={pagination}
              setPagination={setPagination}
            />
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default ClothPages;
