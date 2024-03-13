export default interface IInput {
    control: any;
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: { label: string; value: string }[];
    help?: string;
    text?: string;
    disabled?: boolean;
    alignment?: "horizontal" | "vertical";
  }
  