import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Student } from './student.entity';

export enum DocumentType {
  REPORT_CARD = 'report_card',
  CERTIFICATE = 'certificate',
  OTHER = 'other',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  file_url: string;

  @Index()
  @ManyToOne(() => Student, { nullable: false })
  student: Student;

  @Column({ type: 'enum', enum: DocumentType, default: DocumentType.OTHER })
  type: DocumentType;

  @Column({ type: 'boolean', default: true })
  visibility: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}