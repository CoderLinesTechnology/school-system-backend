import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Parent } from './parent.entity';
import { Student } from './student.entity';

@Entity('parent_students')
export class ParentStudent {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @ManyToOne(() => Parent, { nullable: false })
  parent: Parent;

  @Index()
  @ManyToOne(() => Student, { nullable: false })
  student: Student;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}