import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from './student.entity';
import { Class } from './class.entity';
import { User } from './user.entity';

export enum DocumentType {
  REPORT = 'report',
  RECEIPT = 'receipt',
  ASSIGNMENT = 'assignment',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, { nullable: true })
  student: Student;

  @ManyToOne(() => Class, { nullable: true })
  class: Class;

  @Column({ type: 'enum', enum: DocumentType })
  type: DocumentType;

  @Column({ length: 255 })
  filename: string;

  @ManyToOne(() => User)
  uploaded_by: User;

  @Column({ default: true })
  visibility: boolean;
}