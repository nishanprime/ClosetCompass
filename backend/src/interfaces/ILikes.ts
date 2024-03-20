import IBase from "./IBase";

export default interface ILikes extends IBase {
  user_id: number;
  post_id: number;
}
