import { IOutfitAndCloth } from "@interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "outfit_and_cloth_entity" })
export default class OutfitAndClothEntity extends BaseEntity implements IOutfitAndCloth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  outfit_id: number;

  @Column({ nullable: false })
  cloth_id: number;

  @Column({ nullable: false })
  location_id: number;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
