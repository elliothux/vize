import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BizEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 128, nullable: false })
  key: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 256, nullable: false })
  logo: string;

  @Column({ type: 'datetime', nullable: false })
  createdTime: Date;

  @Column({ type: 'datetime', nullable: true })
  modifiedTime?: Date;

  @Column({ type: 'simple-array', nullable: false })
  materials: string[];
}
