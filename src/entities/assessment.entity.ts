import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from './student.entity';
import { Subject } from './subject.entity';

@Entity('assessments')
export class Assessment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Subject)
  subject: Subject;

  @Column({ type: 'float' })
  score: number;

  @Column({ length: 100 })
  term: string;
}