import IBase from "./IBase";

export default interface IDislikes extends IBase {
  user_id: number;
  post_id: number;
}
