import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Checkbox,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

import { IField } from "interfaces/index";

const CheckboxInput = ({
  name,
  control,
  required,
  label,
  rules,
  disabled,
  helpText,
}: IField) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormControl
            id={name}
            isInvalid={error && true}
            isRequired={required}
            mb="3"
          >
            <Checkbox
              isChecked={value}
              onChange={onChange}
              isDisabled={disabled}
              colorScheme="brand.primaryScheme"
            >
              {label}
            </Checkbox>

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

export default CheckboxInput;
