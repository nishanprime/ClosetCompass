"use client";

import { useRef } from "react";
import { UploadCloud } from "lucide-react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FileService } from "../../services/index";

const FileInput = ({
  placeholder,
  field,
  type,
}: {
  placeholder: string;
  field: ControllerRenderProps<FieldValues, string>;
  type: "single" | "multiple";
}) => {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    if (inputFile?.current) {
      inputFile.current.click();
    }
  };

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "multiple") {
      const files = e.target.files;
      if (files && files.length > 0) {
        const fileToUpload = new FormData();
        Array.from(files).forEach((file) => {
          fileToUpload.append("files", file);
        });
        const response = await FileService.upload(fileToUpload);
        const returnArr = [];
        for (const actualFile of response) {
          if (actualFile && actualFile.key && actualFile.name) {
            returnArr.push({
              ...actualFile,
            });
          }
        }
        field.onChange(returnArr);
      } else {
        field.onChange(null);
      }
    } else {
      const file = e.target.files?.[0];
      const data = new FormData();
      data.append("files", file as File);
      const res = await FileService.upload(data);

      if (res?.relative_path) {
        field.onChange({
          name: file?.name,
          src: res.relative_path,
          id: res.id,
        });
      } else {
        field.onChange(null);
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center border rounded-md h-40 w-60 cursor-pointer px-5 text-center space-y-5"
      onClick={onClick}
    >
      <UploadCloud size={30} />

      <p className="text-xs text-muted-foreground">{placeholder}</p>

      <input
        id="file-input"
        type="file"
        className="hidden"
        ref={inputFile}
        accept="image/*"
        onChange={handleOnChange}
        onBlur={field.onBlur}
        multiple={type === "multiple"}
      />
    </div>
  );
};

export default FileInput;
