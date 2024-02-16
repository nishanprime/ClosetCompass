import { IClothType } from "@interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "cloth_type_entity" })
export default class ClothTypeEntity extends BaseEntity implements IClothType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type_name: string;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
