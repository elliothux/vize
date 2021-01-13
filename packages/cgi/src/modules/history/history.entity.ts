import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HistoryEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

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

  @Column({ type: 'text', nullable: true })
  sharedComponentInstances?: string;

  @Column({ type: 'text', nullable: true })
  maxKeys?: string;
}
