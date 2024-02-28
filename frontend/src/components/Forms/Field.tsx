import { IField } from "interfaces";
import {
  EmailInput,
  TextInput,
  PasswordInput,
  DatepickerInput,
  MultipleFileInput,
  NumberInput,
  TextareaInput,
  CheckboxGroupInput,
  DropdownInput,
  CheckboxInput,
} from "./index";

export interface IProps extends IField {
  type:
    | "text"
    | "email"
    | "password"
    | "date"
    | "multiple-file"
    | "number"
    | "textarea"
    | "checkbox-group"
    | "dropdown"
    | "checkbox";
}

const Field = ({ ...field }: IProps) => {
  const {
    type,
    name,
    label,
    tooltip,
    disabled,
    placeholder,
    required,
    control,
    readMode,
    showIcon,
    helpText,
    passwordStrength,
    min,
    max,
    options,
  } = field;

  let validations = {};

  if (required) {
    validations = {
      required: `${label} is required`,
    };
  }

  if (type === "email") {
    validations = {
      ...validations,
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Please enter a valid email address",
      },
    };
  }

  if (type === "password" && passwordStrength) {
    validations = {
      ...validations,
      minLength: {
        value: 10,
        message: "Password must be at least 10 characters",
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
        message:
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
      },
    };
  }

  const props: IField = {
    control,
    name,
    label,
    disabled,
    placeholder,
    tooltip,
    required,
    rules: validations,
    readMode,
    showIcon,
    helpText,
    passwordStrength,
    min,
    max,
    options,
  };

  switch (type) {
    case "text": {
      return <TextInput key={name} {...props} />;
    }

    case "email": {
      return <EmailInput key={name} {...props} />;
    }

    case "password": {
      return <PasswordInput key={name} {...props} />;
    }

    case "date": {
      return <DatepickerInput key={name} {...props} />;
    }

    case "multiple-file": {
      return <MultipleFileInput key={name} {...props} />;
    }

    case "number": {
      return <NumberInput key={name} {...props} />;
    }

    case "textarea": {
      return <TextareaInput key={name} {...props} />;
    }

    case "checkbox-group": {
      return <CheckboxGroupInput key={name} {...props} />;
    }

    case "dropdown": {
      return <DropdownInput key={name} {...props} />;
    }

    case "checkbox": {
      return <CheckboxInput key={name} {...props} />;
    }

    default:
      return null;
  }
};

export default Field;
