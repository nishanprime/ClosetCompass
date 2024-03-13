import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  CheckboxGroup,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

import { IField } from "@/interfaces";

const CheckboxGroupInput = ({
  name,
  control,
  required,
  label,
  rules,
  disabled,
  helpText,
  options,
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
            <FormLabel mb="5">{label}</FormLabel>

            <CheckboxGroup
              colorScheme="brand.primaryScheme"
              value={value}
              onChange={onChange}
              isDisabled={disabled}
            >
              <Stack spacing="3">
                {options?.map((option: any) => (
                  <Checkbox
                    value={option.value}
                    fontSize={["xs", "xs", "sm"]}
                    key={option.value}
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>

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

export default CheckboxGroupInput;
