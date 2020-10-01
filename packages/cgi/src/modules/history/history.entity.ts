import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PageEntity } from '../page/page.entity';

@Entity()
export class HistoryEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ManyToOne(
    () => PageEntity,
    page => page.id,
    { nullable: false },
  )
  @JoinColumn()
  page: PageEntity;

  @Column({ type: 'datetime', nullable: false })
  createdTime: Date;

  @Column({ type: 'varchar', length: 128, nullable: false })
  author: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 256, nullable: false })
  desc: string;

  @Column({ type: 'datetime', nullable: true })
  startTime?: Date;

  @Column({ type: 'datetime', nullable: true })
  endTime?: Date;

  @Column({ type: 'varchar', length: 256, nullable: true })
  expiredJump?: string;

  @Column({ type: 'text', nullable: false })
  globalProps: string;

  @Column({ type: 'text', nullable: false })
  globalStyle: string;

  @Column({ type: 'mediumtext', nullable: false })
  pageInstances: string;

  @Column({ type: 'text', nullable: true })
  pluginInstances?: string;

  @Column({ type: 'text', nullable: false })
  editInfo: string;
}
