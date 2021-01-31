import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MaterialsEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'datetime', nullable: false })
  createdTime: Date;

  @Column({ type: 'datetime', nullable: true })
  modifiedTime: Date;

  @Column({ type: 'varchar', length: 128, nullable: false })
  author: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  libName: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  displayName: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  desc?: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  thumb?: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  version: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  runtime: 'react' | 'rax';

  @Column({ type: 'text', nullable: false })
  manifest: string;
}
