import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Student } from './student.entity';
import { Subject } from './subject.entity';

@Entity('assessments')
export class Assessment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index() // Optimize queries by student
  @ManyToOne(() => Student, { nullable: false })
  student: Student;

  @Index() // Optimize queries by subject
  @ManyToOne(() => Subject, { nullable: false })
  subject: Subject;

  @Column({ type: 'numeric', precision: 5, scale: 2 }) // e.g., 100.00
  score: number;

  @Column({ length: 50 }) // Reduced for efficiency
  term: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}