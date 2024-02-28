import { ILikes } from "@interfaces";
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "likes_entity" })
export default class LikesEntity extends BaseEntity implements ILikes {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  post_id: number;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
