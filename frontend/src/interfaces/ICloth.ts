import IBase from "./IBase";

export default interface ICloth extends IBase {
  id: number;
  user_id: number;
  description: string;
  no_of_wears: number;
  wears_remaining: number;
  media_id: number;
}
