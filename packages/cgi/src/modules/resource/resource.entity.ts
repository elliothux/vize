import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class ResourceEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 16, nullable: false })
  type: 'image' | 'video' | 'audio' | string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  extension: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  filename: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  url: string;

  @Column({ type: 'datetime', nullable: false })
  createdTime: Date;

  @OneToMany(
    () => UserEntity,
    user => user.id,
    { nullable: false },
  )
  @JoinColumn()
  user: UserEntity;
}
