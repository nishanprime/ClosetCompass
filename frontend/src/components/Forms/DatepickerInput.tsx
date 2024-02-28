import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Icon,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import DatePicker from "react-date-picker";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";

import { IField } from "interfaces/index";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const DatepickerInput = ({
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
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        const onDateChange = (date: any) => {
          onChange(date);
        };

        return (
          <FormControl
            id={name}
            isInvalid={error && true}
            isRequired={required}
          >
            <FormLabel mb="1">{label}</FormLabel>

            <DatePicker
              value={value ? new Date(value) : null}
              onChange={onDateChange}
              dayPlaceholder="DD"
              monthPlaceholder="MM"
              yearPlaceholder="YYYY"
              calendarClassName="date-calendar"
              format="dd/MM/y"
              clearIcon={null}
              calendarIcon={null}
              disabled={disabled}
              className="date-container"
              onBlur={onBlur}
              prev2Label={null}
              next2Label={null}
              nextLabel={<Icon as={BsArrowRightShort} fontSize="2xl" />}
              prevLabel={<Icon as={BsArrowLeftShort} fontSize="2xl" />}
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

export default DatepickerInput;
