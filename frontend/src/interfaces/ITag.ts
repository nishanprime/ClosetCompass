import IBase from "./IBase";

export default interface ITag extends IBase {
  id: number;
  tag_name: string;
  user_id: number;
}
