import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Parent } from './parent.entity';
import { Student } from './student.entity';

@Entity('parent_student')
export class ParentStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Parent)
  parent: Parent;

  @ManyToOne(() => Student)
  student: Student;
}