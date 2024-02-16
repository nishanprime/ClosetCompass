import IBase from "./IBase";

export default interface IOutfitCalender extends IBase {
  outfit_id: number;
  user_id: number;
  date: Date;
  special_event_id: number;
}
