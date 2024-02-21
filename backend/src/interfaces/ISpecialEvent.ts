import IBase from "./IBase";

export default interface ISpecialEvent extends IBase {
  description: string;
  outfit_id: number;
  priority: number;
  when_is_it: Date;
}
