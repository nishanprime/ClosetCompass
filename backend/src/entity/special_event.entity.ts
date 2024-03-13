import { ISpecialEvent } from "@/interfaces";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "special_event_entity" })
export default class SpecialEventEntity
  extends BaseEntity
  implements ISpecialEvent
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  outfit_id: number;

  @Column({ nullable: false })
  priority: number;

  @Column({ nullable: false })
  when_is_it: Date;

  @Column({ nullable: false })
  description: string;

  // default columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
