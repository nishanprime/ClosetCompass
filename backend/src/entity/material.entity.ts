import { IMaterial } from "@interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "material_entity" })
export default class MaterialEntity extends BaseEntity implements IMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  material_type: string;

  @Column({ nullable: true })
  number_of_wears: number;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
