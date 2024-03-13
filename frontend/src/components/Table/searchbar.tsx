import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { Input } from "@chakra-ui/react";

const SearchToolbar = ({
  setSearch,
  placeholder,
}: {
  setSearch: (value: string) => void;
  placeholder: string;
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = useCallback(
    debounce((value: string) => {
      console.log("Handling search", value);
      setSearch(value);
    }, 1000),
    []
  );

  return (
    <div className="flex items-center justify-between space-y-2 pt-4 w-full">
      <Input
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder={placeholder}
        className="min-w-[400px] w-full"
      />
    </div>
  );
};

export default SearchToolbar;
