import { Trash } from "lucide-react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

import { FileService } from "../../services/index";
import { Button } from "@chakra-ui/react";

const PreviewFile = ({
  field,
  type,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  type: "single" | "multiple";
}) => {
  if (type === "single") {
    const handleRemove = async () => {
      await FileService.remove(field.value?.id);
      field.onChange(null);
    };

    if (field.value === null) return null;

    const fileName = field.value?.name;
    const src = `${import.meta.env.VITE_BASE_API_URI}/${field.value?.src}`;

    return (
      <div className="flex flex-col space-y-3 w-fit">
        <img
          src={src}
          className={`rounded-md h-20 w-28 relative object-contain`}
          alt="preview"
        />
        <p className="text-xs text-gray-500 w-[90%] overflow-clip text-ellipsis whitespace-nowrap">
          {fileName}
        </p>

        <Button
          variant="destructive"
          type="button"
          size="sm"
          className="w-fit"
          onClick={handleRemove}
        >
          <Trash className="mr-2 w-4 h-4" />
          Remove
        </Button>
      </div>
    );
  } else {
    const handleRemove = async (index: number) => {
      const files = field.value as { name: string; key: string }[];
      const file = files.splice(index, 1);
      await FileService.remove(file[0]?.key);
      field.onChange(files);
      if (files.length === 0) {
        field.onChange(null);
      }
    };

    if (field.value === null) return null;

    const files = field.value as { name: string; key: string }[];
    return (
      <div
        className="flex gap-2 overflow-scroll py-4"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {files.map((file, index) => {
          const src = `${process.env.NEXT_PUBLIC_API_URL}/files/${file.key}`;
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-1  w-fit"
            >
              <img
                src={src}
                className={`rounded-md h-10 w-16 relative object-contain `}
                alt="preview"
              />
              <p className="text-xs text-gray-500 overflow-clip text-ellipsis whitespace-nowrap">
                {file.name.slice(0, 10) + "..."}
              </p>
              <Trash
                className="w-4 h-4 text-red-500 cursor-pointer"
                onClick={() => handleRemove(index)}
              />
            </div>
          );
        })}
      </div>
    );
  }
};

export default PreviewFile;
