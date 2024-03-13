import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Icon,
  FormHelperText,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";

import { IField } from "@/interfaces/index";

const EmailInput = ({
  name,
  control,
  required,
  label,
  placeholder,
  rules,
  disabled,
  readMode,
  showIcon,
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
              {showIcon && (
                <InputLeftElement>
                  <Icon as={HiOutlineMail} color="brand.lightText" />
                </InputLeftElement>
              )}

              <Input
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                placeholder={placeholder}
                type="email"
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

export default EmailInput;
