import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  studentId: string;

  @Column({ nullable: true })
  classId: string;

  @Column({ default: true })
  visibility: boolean;
}