import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Document } from '../document/entities/document.entity';
import { Assessment } from '../assessment/entities/assessment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Document, Assessment]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}