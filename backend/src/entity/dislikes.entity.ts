import { IDislikes } from "@interfaces";
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "dislikes_entity" })
export default class DislikesEntity extends BaseEntity implements IDislikes {
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
