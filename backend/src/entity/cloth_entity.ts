import { ICloth } from "@/interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "cloth_entity" })
export default class ClothEntity extends BaseEntity implements ICloth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: true })
  media_id: number; 

  @Column()
  description: string;

  @Column({ nullable: false })
  no_of_wears: number;

  @Column({ nullable: false })
  wears_remaining: number;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
