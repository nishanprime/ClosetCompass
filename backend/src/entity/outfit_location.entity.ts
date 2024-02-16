import { IOutfitLocation } from "@interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "outfit_location_entity" })
export default class OutfitLocationEntity
  extends BaseEntity
  implements IOutfitLocation
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  location_name: string;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
