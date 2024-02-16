import { IOutfitAndSpecialEvent } from "@interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "outfit_and_special_event_entity" })
export default class OutfitAndSpecialEventEntity extends BaseEntity implements IOutfitAndSpecialEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  outfit_id: number;

  @Column({ nullable: false })
  special_event_id: number;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
