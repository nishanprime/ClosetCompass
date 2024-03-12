import IBase from "./IBase";
import IMedia from "./IMedia";

export default interface ICloth extends IBase {
  user_id: number;
  description: string;
  no_of_wears: number;
  wears_remaining: number;
  media_id: number;
  media?: IMedia;
}
