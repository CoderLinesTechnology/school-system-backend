import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { School } from './school.entity';
import { User } from './user.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  name: string;

  @Index()
  @ManyToOne(() => School, { nullable: false })
  school: School;

  @Index()
  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column({ length: 255, nullable: true })
  subject_specialization: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}