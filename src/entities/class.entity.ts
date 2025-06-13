import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { School } from './school.entity';
import { Teacher } from './teacher.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  name: string;

  @Index()
  @ManyToOne(() => School, { nullable: false })
  school: School;

  @Index()
  @ManyToOne(() => Teacher, { nullable: true })
  class_teacher: Teacher;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}