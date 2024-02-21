import { IMedia } from "@interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "media_entity" })
export default class MediaEntity extends BaseEntity implements IMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  relative_path: string;

  @Column({ nullable: false })
  media_type: string;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
