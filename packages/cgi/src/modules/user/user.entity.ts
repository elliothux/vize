import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;

  @Column({ type: 'simple-array', nullable: false })
  bizs: string[];

  @Column({ type: 'tinyint', nullable: false })
  isAdmin: number;

  @Column({ type: 'tinyint', nullable: false })
  isDeveloper: number;

  @Column({ type: 'varchar', length: 64, nullable: true })
  __developerAccessToken?: string;

  @Column({ type: 'text', nullable: true })
  extInfo?: string;

  @Column({ type: 'datetime', nullable: false })
  createdTime: Date;
}
