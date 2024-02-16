import { IColor } from "@interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "color_entity" })
export default class ColorEntity extends BaseEntity implements IColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  color_code: string;

  @Column({ nullable: false })
  color_name: string;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
