import { IOutfitCalender } from "@/interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "outfit_calender_entity" })
export default class OutfitCalenderEntity
  extends BaseEntity
  implements IOutfitCalender
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  outfit_id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: true })
  special_event_id: number;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
