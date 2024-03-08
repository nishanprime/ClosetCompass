import { Control } from "react-hook-form";

export default interface IField {
  control: Control;
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  disabled?: boolean;
  readMode?: boolean;
  required?: boolean;
  rules?: any;
  showIcon?: boolean;
  helpText?: string;
  min?: number;
  max?: number;
  options?: any;
  passwordStrength?: boolean;
}
