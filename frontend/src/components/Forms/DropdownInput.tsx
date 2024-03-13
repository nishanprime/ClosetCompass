import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import Select, { StylesConfig, GroupBase } from "react-select";
import { Controller } from "react-hook-form";

import { IField } from "@/interfaces/index";

interface IOption {
  label: string;
  value: string;
}

const DropdownInput = ({
  name,
  control,
  required,
  label,
  placeholder,
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
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        const styles: StylesConfig<IOption, boolean, GroupBase<IOption>> = {
          control: (base, state) => ({
            ...base,
            fontSize: "14px",
            height: "40px",
            borderColor: state.isFocused ? "#611CB9" : "#E2E8F0",
            backgroundColor: state.isDisabled ? "#f2f2f2" : "#F9FAFB",
            cursor: state.isDisabled ? "not-allowed" : "default",
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: "300px",
          }),
          placeholder: (base) => ({ ...base, fontSize: "14px" }),
          option: (base) => ({
            ...base,
            fontSize: "14px",
            zIndex: 9999,
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          clearIndicator: (base) => ({
            ...base,
            cursor: "pointer",
          }),
        };

        return (
          <FormControl
            id={name}
            isInvalid={error && true}
            isRequired={required}
          >
            <FormLabel mb="1">{label}</FormLabel>

            <Select
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              placeholder={placeholder}
              isDisabled={disabled}
              styles={styles}
              menuPosition="fixed"
              menuPortalTarget={document.body}
              options={options}
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

export default DropdownInput;
