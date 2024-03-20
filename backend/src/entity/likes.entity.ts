import { ILikes } from "@/interfaces";
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from "typeorm";

@Entity({ name: "likes_entity" })
export default class LikesEntity extends BaseEntity implements ILikes {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  post_id: number;

  @Column({nullable: true})
  id: number;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
