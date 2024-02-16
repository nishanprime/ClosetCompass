import IBase from "./IBase";

export default interface ICloth extends IBase {
  user_id: number;
  description: string;
  type_id: number;
  color_id: number;
  material: number;
  no_of_wears: number;
}