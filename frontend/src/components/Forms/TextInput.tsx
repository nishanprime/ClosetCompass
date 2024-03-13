import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

import { IField } from "@/interfaces/index";

const TextInput = ({
  name,
  control,
  required,
  label,
  placeholder,
  rules,
  disabled,
  readMode,
  helpText,
}: IField) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        return (
          <FormControl
            id={name}
            isInvalid={error && true}
            isRequired={required}
          >
            <FormLabel mb="1">{label}</FormLabel>
            <Input
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              placeholder={placeholder}
              type="text"
              isDisabled={disabled}
              readOnly={readMode}
              autoComplete="off"
              maxLength={255}
              fontSize={["xs", "xs", "sm"]}
              _placeholder={{
                color: "brand.lightText",
                fontSize: ["xs", "xs", "sm"],
              }}
              bg="brand.grayBackground"
              isRequired={false}
            />
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

export default TextInput;
