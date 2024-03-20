import { useQuery } from "react-query";
import { OutfitService } from "@/services";
import { useTable } from "@/hook/useTable";
import { CustomTable } from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { Button, Flex, Skeleton, Stack } from "@chakra-ui/react";
import TablePagination from "@/components/Table/tablePagination";
import SearchToolbar from "@/components/Table/searchbar";

const OutfitPages = () => {
  const {
    sort,
    pagination,
    setPagination,
    search,
    setSearch,
    total,
  } = useTable();

  const {
    data: outfits,
    isLoading: loading,
    refetch,
  } = useQuery(
    ["clothe-inventory", { sort, pagination, search, total }],
    () => {
      return OutfitService.getAllOutfits({
        search: search,
        page: pagination.current,
        page_size: pagination.pageSize,
        sort_by: sort?.field || "created_at",
        sort_order: sort?.order || "DESC",
      });
    }
  );

  type OutfitTableEntries = {
    id: string;
    name: string;
    description: string;
    clothes: [
      {
        media_id: string;
      }
    ];
    actions: React.ReactNode;
  };

  const columnHelper = createColumnHelper<OutfitTableEntries>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "Description",
    }),
    columnHelper.accessor("clothes", {
      cell: (info) => {
        return (<Stack direction={"row"}>
          {info.getValue()?.map((cloth) => {
            return (
              <Flex flex-direction="row">
                <img
                  src={`${import.meta.env.VITE_API_URI}/files/${
                    cloth.media_id
                  }`}
                  alt="cloth"
                  className=" w-4"
                />
              </Flex>
            );
          })}
        </Stack>);
      },
      header: "Clothes",
    }),
    columnHelper.accessor("id", {
      cell: (info) => {
        return (
          <Button
            colorScheme="blue"
            onClick={async () => {
              await OutfitService.deleteOutfitById(info.getValue());
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
  console.log("printing outfits", outfits?.outfits || []);
  return (
    <div>
      <div className="w-full h-screen flex gap-4 p-4">
        <Skeleton isLoaded={!loading} height={"50%"} className="w-3/4">
          <div className="w-full flex flex-col items-start gap-4">
            <div className=" min-w-[400px]">
              <SearchToolbar
                setSearch={setSearch}
                placeholder="Search Outfit"
              />
            </div>
            <CustomTable data={outfits?.outfits || []} columns={columns} />
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

export default OutfitPages;
