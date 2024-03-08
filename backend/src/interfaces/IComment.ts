import IBase from "./IBase";

export default interface IComment extends IBase {
  user_id: number;
  text: string;
  post_id: number;
}
