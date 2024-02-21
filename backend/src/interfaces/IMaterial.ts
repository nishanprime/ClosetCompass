import IBase from "./IBase";

export default interface IMaterial extends IBase {
    material_type: string;
    number_of_wears: number;
}