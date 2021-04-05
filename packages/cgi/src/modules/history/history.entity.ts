import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { RecordStatus } from '../../types';

@Entity()
export class HistoryEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 128, nullable: false })
  pageKey: string;

  @Column({ type: 'datetime', nullable: false })
  createdTime: Date;

  @Column({ type: 'varchar', length: 128, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 256, nullable: false })
  desc: string;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  pageCount: number;

  @Column({ type: 'longtext', nullable: false })
  dsl: string;

  @ManyToOne(
    () => UserEntity,
    user => user.id,
    { nullable: false },
  )
  @JoinColumn()
  creator: UserEntity;

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status: RecordStatus;
}
