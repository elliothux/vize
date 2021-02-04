import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  bizIds: string;

  @Column({ type: 'tinyint', nullable: false })
  isAdmin: number;

  @Column({ type: 'varchar', length: 512, nullable: true })
  avatar?: string;

  @Column({ type: 'text', nullable: true })
  extInfo?: string;

  @Column({ type: 'datetime', nullable: false })
  createdTime: Date;
}
