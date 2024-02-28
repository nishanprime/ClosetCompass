import IBase from "./IBase";

export default interface IPost extends IBase {
  user_id: number;
  text: string;
  outfit_id: number;
  media_id: number;
  privacy: string;
}
