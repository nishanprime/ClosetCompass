import IBase from "./IBase";

export default interface IMedia extends IBase {
  relative_path: string;

  media_type: string;
}
