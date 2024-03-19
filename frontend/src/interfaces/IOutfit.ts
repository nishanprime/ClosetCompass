import IBase from "./IBase";

export default interface IOutfit extends IBase {
    user_id: number;
    name: string;
    description: string;
}