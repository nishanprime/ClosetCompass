import IBase from "./IBase";

export default interface IDislikes extends Omit<IBase, 'id'> {
  user_id: number;
  post_id: number;
}
