import { IClothAndTag } from "@interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "color_and_tags_entity" })
export default class ClothAndTagEntity extends BaseEntity implements IClothAndTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  cloth_id: number;

  @Column({ nullable: false })
  tag_id: number;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
