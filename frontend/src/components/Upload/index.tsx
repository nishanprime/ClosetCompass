import { FormControl, FormLabel } from "@chakra-ui/react";
import { IInput } from "@/interfaces";
import { useController } from "react-hook-form";
import PreviewFile from "./preview-file";
import FileInput from "./file-input";

interface IFileUpload extends IInput {
  type?: "single" | "multiple";
}

const FileUpload = ({
  control,
  label,
  name,
  placeholder = "Click to select file to upload",
  required,
  type = "single",
}: IFileUpload) => {
  const { field } = useController({ name, control });
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <FormControl isRequired={required}>
        {field.value ? (
          <PreviewFile field={field} type={type} />
        ) : (
          <FileInput placeholder={placeholder} field={field} type={type} />
        )}
      </FormControl>
    </>
  );
};

export default FileUpload;
