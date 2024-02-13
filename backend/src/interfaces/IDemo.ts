import IBase from "./IBase";

export default interface IDemo extends IBase {
  name: string;
  description: string;
  isActive: boolean;
}
