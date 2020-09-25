import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  key: string;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  logo: string;

  @Column({ type: 'datetime' })
  createdTime: Date;

  @Column({ type: 'datetime' })
  modifiedTime: Date;
}
