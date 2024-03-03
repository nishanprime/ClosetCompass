import { IPost } from "@interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";


@Entity({ name: "post_entity" })
export default class PostEntity extends BaseEntity implements IPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: true })
  media_id: number; 

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: false })
  outfit_id: number;

  @Column()
  privacy: string;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
