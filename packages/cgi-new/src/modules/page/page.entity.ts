import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BizEntity } from 'modules/biz/biz.entity';
import { HistoryEntity } from '../history/history.entity';

@Entity()
export class PageEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 128, nullable: false })
  key: string;

  @Column({ type: 'datetime', nullable: false })
  createdTime: Date;

  @Column({ type: 'varchar', length: 128, nullable: false })
  author: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  layoutMode: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  pageMode: string;

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status: number;

  @ManyToOne(
    () => BizEntity,
    biz => biz.id,
    { nullable: false },
  )
  @JoinColumn()
  biz: BizEntity;

  @ManyToOne(
    () => HistoryEntity,
    history => history.id,
    { nullable: true },
  )
  @JoinColumn()
  latestHistory?: HistoryEntity;
}
