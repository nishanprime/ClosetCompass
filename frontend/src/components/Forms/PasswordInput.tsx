import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  IconButton,
  InputRightElement,
  InputLeftElement,
  Icon,
  FormHelperText,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";

import { IField } from "interfaces/index";

const PasswordInput = ({
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
  const [show, setShow] = useState(false);

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
                  <Icon as={RiLockPasswordLine} color="brand.lightText" />
                </InputLeftElement>
              )}

              <Input
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                placeholder={placeholder}
                type={show ? "text" : "password"}
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
              />

              <InputRightElement>
                <IconButton
                  size="sm"
                  onClick={() => setShow(!show)}
                  aria-label="Show password"
                  variant="ghost"
                  icon={show ? <FiEyeOff /> : <FiEye />}
                >
                  {show ? "Hide" : "Show"}
                </IconButton>
              </InputRightElement>
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

export default PasswordInput;
