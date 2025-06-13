import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { School } from '../entities/school.entity';
import { Teacher } from '../entities/teacher.entity';
import { Student } from '../entities/student.entity';
import { Parent } from '../entities/parent.entity';
import { Document } from '../entities/document.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, Teacher, Student, Parent, Document, User])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}