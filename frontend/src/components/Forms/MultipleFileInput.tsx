import { useCallback } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Icon,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { MdUploadFile } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";

import { IField } from "interfaces/index";
import { handleStringError } from "utils/helpers";

const MultipleFileInput = ({
  name,
  control,
  required,
  label,
  placeholder = "",
  rules,
  disabled,
  helpText,
}: IField) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        const onDrop = useCallback(
          (acceptedFiles: File[]) => {
            onChange(acceptedFiles);
            onBlur();
          },
          [onChange]
        );
        const max_file_size =
          (import.meta.env.VITE_FILE_SIZE_LIMIT &&
            parseFloat(import.meta.env.VITE_FILE_SIZE_LIMIT) * 1000000) ||
          1000000;
        const { getRootProps, getInputProps } = useDropzone({
          maxFiles: 10,
          onDrop,
          disabled: disabled,
          // 1 mb max
          maxSize: max_file_size,
          onDropRejected: (fileRejections) => {
            fileRejections.forEach((fileRejection) => {
              // show file name size is greater than 1 mb
              handleStringError(
                `File ${
                  fileRejection.file.name
                } was rejected due to size limit. ${
                  import.meta.env.VITE_FILE_SIZE_LIMIT
                } MB max`
              );
            });
          },
        });

        const removeFile = (index: number) => {
          const files = value.filter((_: File, i: number) => i !== index);
          onChange(files);
        };

        return (
          <FormControl
            id={name}
            isInvalid={error && true}
            isRequired={required}
          >
            <FormLabel mb="1">{label}</FormLabel>
            <Flex
              w="full"
              borderColor="brand.border"
              borderWidth="1px"
              borderRadius="md"
              align="center"
              justify="center"
              flexDirection="column"
              gap="2"
              p="14"
              cursor="pointer"
              bg="brand.grayBackground"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon as={MdUploadFile} fontSize="5xl" color="brand.primary" />
              <Text fontWeight={600}>
                {placeholder !== "" ? placeholder : "Upload files"}
              </Text>
              <Text fontSize="sm" color="brand.lightText">
                or drag and drop it here
              </Text>
              <Text fontSize="sm" color="brand.lightText">
                Accepted file types: pdf, .doc, .txt etc.
              </Text>
            </Flex>

            {value && value.length > 0 && (
              <Flex w="full" flexDirection="column" mt="5" gap="2">
                {value.map((file: File, index: number) => (
                  <Flex
                    w="full"
                    p="2"
                    borderRadius="md"
                    align="center"
                    justify="space-between"
                    borderColor="brand.border"
                    borderWidth="1px"
                    key={index}
                  >
                    <Flex align="center" gap="2">
                      <Icon as={HiOutlineDocumentText} fontSize="2xl" />
                      <Text fontSize="sm" fontWeight="semibold">
                        {file.name}
                      </Text>
                    </Flex>
                    <IconButton
                      aria-label="Search database"
                      icon={<Icon as={AiOutlineDelete} />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => removeFile(index)}
                    />
                  </Flex>
                ))}
              </Flex>
            )}

            <FormErrorMessage>{error?.message}</FormErrorMessage>
            {helpText !== "" && (
              <FormHelperText
                color="brand.primary"
                fontSize={["xs", "xs", "sm"]}
              >
                {helpText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default MultipleFileInput;
