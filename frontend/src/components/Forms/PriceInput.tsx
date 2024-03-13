import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

import { IField } from "@/interfaces/index";

const PriceInput = ({
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

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                fontSize="0.8rem"
                children="$"
              />
              <Input
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                placeholder={placeholder}
                type="number"
                isDisabled={disabled}
                readOnly={readMode}
                autoComplete="off"
                maxLength={255}
                fontSize={["sm", "sm", "md"]}
                _placeholder={{
                  color: "brand.lightText",
                  fontSize: ["xs", "xs", "sm"],
                }}
                bg="brand.grayBackground"
                isRequired={false}
              />
            </InputGroup>

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

export default PriceInput;
