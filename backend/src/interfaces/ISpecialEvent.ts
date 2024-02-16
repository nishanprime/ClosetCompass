import IBase from "./IBase";

export default interface ISpecialEvent extends IBase {
  description: string;
  priority: number;
  when_is_it: Date;
}
