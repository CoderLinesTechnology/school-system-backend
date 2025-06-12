import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  subject: string;

  @Column()
  term: string;

  @Column()
  grade: number;

  @Column({ nullable: true })
  classId: string;
}