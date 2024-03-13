import { ITag } from "@/interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "tag_entity" })
export default class TagEntity extends BaseEntity implements ITag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  tag_name: string;

  @Column({ nullable: false })
  user_id: number;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
